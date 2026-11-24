import { useDebugValue, useRef, type RefObject } from "react";

import useEventListener from "./useEventListener";
import useLatestRef from "./useLatestRef";
import useLayoutRefEffect from "./useLayoutRefEffect";
import usePersist from "./usePersist";
import useRaf from "./useRaf";
import useSafeState from "./useSafeState";
import getScrollListenerTarget from "./utils/getScrollListenerTarget";
import getScroller from "./utils/getScroller";
import isEditableTarget from "./utils/isEditableTarget";
import isPageScroller from "./utils/isPageScroller";
import isRtl from "./utils/isRtl";

interface UseScrollSpyOptions {
  /**
   * The scroll container (or its ref). Defaults to the page; pass `null` to track nothing.
   */
  target?: Element | RefObject<Element | null> | null;

  /** The axis to track. Defaults to `"y"`. */
  axis?: "x" | "y";

  /**
   * The activation line: pixels from the container's start edge. Defaults to `0`.
   */
  offset?: number;

  /**
   * Resolves a key to its section element. Defaults to an id lookup in the container's
   * document, and is called on every measurement.
   */
  getElement?: (key: string, index: number) => Element | null;
}

interface ScrollSpyActions {
  /**
   * Report `key` as the active item and hold it until the user scrolls or `release` is
   * called. It does not scroll the container.
   */
  select: (key: string) => void;

  /** Drop a held key and resume tracking. */
  release: () => void;
}

// Keys that scroll the container; pressing one hands tracking back to the scroll position.
const SCROLL_KEYS = new Set([
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "PageUp",
  "PageDown",
  "Home",
  "End",
  " ",
]);

// The top edge on the vertical axis; the inline start edge on the horizontal one, which is
// the right edge in right-to-left layouts.
function getStartEdge(rect: DOMRect, axis: "x" | "y", rtl: boolean) {
  if (axis === "y") {
    return rect.top;
  }
  return rtl ? rect.right : rect.left;
}

// Tells whether a section reached the activation line, `offset` pixels past the start edge.
function createCoverage(container: Element, axis: "x" | "y", rtl: boolean, offset: number) {
  let start: number;

  if (isPageScroller(container)) {
    // Page scroller rects span the whole document, so the start edge is the viewport's;
    // `clientWidth` excludes the scrollbar, as the rects do.
    start = axis === "y" || !rtl ? 0 : container.clientWidth;
  } else {
    start = getStartEdge(container.getBoundingClientRect(), axis, rtl);
  }

  const sign = axis === "x" && rtl ? -1 : 1;

  // A fractional layout can leave a snapped section a fraction of a pixel past the line.
  return (element: Element) =>
    (getStartEdge(element.getBoundingClientRect(), axis, rtl) - start) * sign <= offset + 1;
}

function isScrolledToEnd(container: Element, axis: "x" | "y") {
  const scrollSize = axis === "y" ? container.scrollHeight : container.scrollWidth;
  const clientSize = axis === "y" ? container.clientHeight : container.clientWidth;
  // Only the horizontal axis reports negative offsets (in RTL); a negative `scrollTop` is a
  // real position.
  const position = axis === "y" ? container.scrollTop : Math.abs(container.scrollLeft);
  const maxScroll = scrollSize - clientSize;

  // Content that fits does not scroll, and sub-pixel overflow is layout rounding.
  return maxScroll > 1 && position >= maxScroll - 1;
}

// A hidden (e.g. `display: none`) or detached element has no layout box.
function isRendered(element: Element) {
  return element.getClientRects().length > 0;
}

/**
 * Track which item of a list is currently being read as the page or an element scrolls.
 *
 * The active item is the last one whose section reached the activation line, the first item
 * before that, and the last item once the container is scrolled to the end.
 *
 * @param keys The keys of the tracked items, in reading order.
 * @param options The options object.
 * @param options.target The scroll container (or its ref), defaults to the page; `null` tracks nothing.
 * @param options.axis The axis to track, defaults to `"y"`.
 * @param options.offset The activation line: pixels from the container's start edge, defaults to `0`.
 * @param options.getElement Resolves a key to its section element, defaults to an id lookup.
 * @returns Returns a `[activeKey, actions]` tuple: `activeKey` is the active item's key, or
 * `undefined` until the first measurement (including outside the browser); `actions` keeps a
 * stable identity and contains `select` and `release`.
 */
function useScrollSpy(keys: readonly string[], options?: UseScrollSpyOptions) {
  const { target, axis = "y", offset = 0, getElement } = options || {};

  // Most callers rebuild the array on every render, so compare a string signature instead.
  const signature = `${keys.length}\u0000${keys.join("\u0000")}`;

  const [activeKey, setActiveKey] = useSafeState<string>();
  const activeKeyRef = useLatestRef(activeKey);

  const pinnedRef = useRef<string | null>(null);
  const containerRef = useRef<Element | null>(null);
  const listenerRef = useRef<EventTarget | null>(null);
  const windowRef = useRef<Window | null>(null);
  const scheduledRef = useRef(false);

  const measure = usePersist((): string | undefined => {
    const container = containerRef.current;

    if (!container || keys.length === 0) {
      return undefined;
    }

    // Not cached: `dir` can change at runtime, and a style read per frame is cheap.
    const rtl = axis === "x" && isRtl(container);

    // Resolved per measurement, so sections rendered after mount are picked up.
    const resolve = getElement || ((key: string) => container.ownerDocument.getElementById(key));

    if (isScrolledToEnd(container, axis)) {
      // The last section may never reach the line; skip items without a rendered section.
      for (let index = keys.length - 1; index >= 0; index--) {
        const element = resolve(keys[index], index);
        if (element && isRendered(element)) {
          return keys[index];
        }
      }

      return keys[keys.length - 1];
    }

    const isCovered = createCoverage(container, axis, rtl, offset);
    let next = keys[0];

    for (let index = 0; index < keys.length; index++) {
      const element = resolve(keys[index], index);
      if (element && isRendered(element) && isCovered(element)) {
        next = keys[index];
      }
    }

    return next;
  });

  const commit = usePersist(() => {
    if (pinnedRef.current !== null) {
      return;
    }

    const next = measure();
    if (next !== activeKeyRef.current) {
      // Update the ref eagerly so later measurements compare against it.
      activeKeyRef.current = next;
      setActiveKey(next);
    }
  });

  const [startRaf] = useRaf(() => {
    scheduledRef.current = false;
    commit();
  });

  const schedule = usePersist(() => {
    if (!containerRef.current || pinnedRef.current !== null || scheduledRef.current) {
      return;
    }
    scheduledRef.current = true;
    startRaf();
  });

  const release = usePersist(() => {
    if (pinnedRef.current === null) {
      return;
    }
    pinnedRef.current = null;
    schedule();
  });

  const select = usePersist((key: string) => {
    pinnedRef.current = key;
    if (key !== activeKeyRef.current) {
      activeKeyRef.current = key;
      setActiveKey(key);
    }
  });

  useLayoutRefEffect(() => {
    const container = getScroller(target);

    containerRef.current = container;
    listenerRef.current = container ? getScrollListenerTarget(container) : null;
    // `resize` and `pageshow` are dispatched on the window, not on a scrolling element.
    windowRef.current = container ? container.ownerDocument.defaultView : null;
    // A hold belongs to the container it was set in.
    pinnedRef.current = null;
    commit();

    return () => {
      containerRef.current = null;
      listenerRef.current = null;
      windowRef.current = null;
    };
  }, [target, axis, commit]);

  useLayoutRefEffect(() => {
    if (pinnedRef.current !== null && keys.indexOf(pinnedRef.current) === -1) {
      pinnedRef.current = null;
    }
    commit();
  }, [signature, axis, offset, commit]);

  useEventListener(listenerRef, "scroll", schedule, { passive: true });
  useEventListener(windowRef, "resize", schedule, { passive: true });
  useEventListener(windowRef, "pageshow", schedule, { passive: true });

  // Any user scrolling hands tracking back; `pointerdown` also covers scrollbar drags.
  useEventListener(listenerRef, "wheel", release, { passive: true });
  useEventListener(listenerRef, "touchmove", release, { passive: true });
  useEventListener(listenerRef, "pointerdown", release, { passive: true });
  useEventListener<EventTarget, KeyboardEvent>(listenerRef, "keydown", (event) => {
    // Directions and spaces typed into a field do not scroll the container.
    if (SCROLL_KEYS.has(event.key) && !isEditableTarget(event.target)) {
      release();
    }
  });

  const actionsRef = useRef<ScrollSpyActions | undefined>(undefined);

  if (!actionsRef.current) {
    actionsRef.current = { select, release };
  }

  useDebugValue(activeKey);

  return [activeKey, actionsRef.current] as const;
}

export default useScrollSpy;
