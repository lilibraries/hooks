import { useDebugValue, useRef, type RefObject } from "react";

import useEventListener from "./useEventListener";
import useLatestRef from "./useLatestRef";
import useLayoutRefEffect from "./useLayoutRefEffect";
import usePersist from "./usePersist";
import useRaf from "./useRaf";
import useResizeObserver from "./useResizeObserver";
import useSafeState from "./useSafeState";
import inBrowser from "./utils/inBrowser";
import unref from "./utils/unref";

interface UseScrollOptions {
  /**
   * The element (or its ref) whose scrolling is tracked. Defaults to the page scroll
   * container; pass `null` to track nothing. A ref is read when the effect runs, so an
   * element assigned after the first render is tracked on the next one.
   */
  target?: Element | RefObject<Element | null> | null;
}

interface ScrollState {
  readonly x: number;
  readonly y: number;
  readonly directionX: "left" | "right" | undefined;
  readonly directionY: "up" | "down" | undefined;
  readonly progressX: number;
  readonly progressY: number;
}

interface ScrollSnapshot {
  x: number;
  y: number;
  maxX: number;
  maxY: number;
}

function createInitialState(): ScrollState {
  return {
    x: 0,
    y: 0,
    directionX: undefined,
    directionY: undefined,
    progressX: 0,
    progressY: 0,
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getPageScroller(document: Document) {
  return document.scrollingElement || document.documentElement;
}

function getScroller(target: UseScrollOptions["target"]): Element | null {
  if (!inBrowser || target === null) {
    return null;
  }
  if (target === undefined) {
    return getPageScroller(document);
  }
  return unref(target);
}

function isPageScroller(element: Element) {
  return element === getPageScroller(element.ownerDocument);
}

function getListenerTarget(scroller: Element): EventTarget {
  if (isPageScroller(scroller)) {
    // Page scroll events are dispatched on the window, not on the scrolling element.
    return scroller.ownerDocument.defaultView || scroller;
  }
  return scroller;
}

function getScrollSnapshot(scroller: Element): ScrollSnapshot {
  return {
    x: scroller.scrollLeft,
    y: scroller.scrollTop,
    maxX: Math.max(scroller.scrollWidth - scroller.clientWidth, 0),
    maxY: Math.max(scroller.scrollHeight - scroller.clientHeight, 0),
  };
}

function isRtl(scroller: Element) {
  const view = scroller.ownerDocument.defaultView;
  return !!view && view.getComputedStyle(scroller).direction === "rtl";
}

function getXPosition(x: number, maxX: number, rtl: boolean) {
  return rtl ? clamp(x, -maxX, 0) : clamp(x, 0, maxX);
}

function getYPosition(y: number, maxY: number) {
  return clamp(y, 0, maxY);
}

function getProgressX(x: number, maxX: number, rtl: boolean) {
  if (maxX <= 0 || x === 0) {
    return 0;
  }
  return (rtl ? -x : x) / maxX;
}

function getProgressY(y: number, maxY: number) {
  if (maxY <= 0 || y === 0) {
    return 0;
  }
  return y / maxY;
}

function isSameState(current: ScrollState, next: ScrollState) {
  return (
    current.x === next.x &&
    current.y === next.y &&
    current.directionX === next.directionX &&
    current.directionY === next.directionY &&
    current.progressX === next.progressX &&
    current.progressY === next.progressY
  );
}

/**
 * Track the scroll position, direction and progress of the page or an element.
 *
 * @param options The options object.
 * @param options.target The element (or its ref) to track; defaults to the page scroll
 * container, pass `null` to track nothing. A ref is read when the effect runs, so an
 * element assigned after the first render is tracked on the next one.
 * @returns Returns the scroll state (`x`, `y`, `directionX`, `directionY`, `progressX`,
 * `progressY`). Outside the browser, the state falls back to zeros and `undefined`
 * directions.
 */
function useScroll(options?: UseScrollOptions): ScrollState {
  const { target } = options || {};

  const [state, setState] = useSafeState<ScrollState>(() => createInitialState());
  const stateRef = useLatestRef(state);

  const scrollerRef = useRef<Element | null>(null);
  const listenerRef = useRef<EventTarget | null>(null);
  const resizeRef = useRef<Element | null>(null);
  const windowRef = useRef<Window | null>(null);
  const rtlRef = useRef(false);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  const directionXRef = useRef<"left" | "right" | undefined>(undefined);
  const directionYRef = useRef<"up" | "down" | undefined>(undefined);
  const scheduledRef = useRef(false);
  const trackDirectionRef = useRef(false);

  const commit = usePersist((next: ScrollState) => {
    if (isSameState(stateRef.current, next)) {
      return;
    }
    // Update the ref eagerly so repeated updates before the next render are
    // compared against the latest committed state.
    stateRef.current = next;
    setState(next);
  });

  const update = usePersist((trackDirection: boolean) => {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    const snapshot = getScrollSnapshot(scroller);
    // Refresh the writing direction on layout changes or when the scroll offset sign
    // contradicts the cached value, but not on every normal scroll frame.
    if (
      !trackDirection ||
      (rtlRef.current && snapshot.x > 0) ||
      (!rtlRef.current && snapshot.x < 0)
    ) {
      rtlRef.current = isRtl(scroller);
    }

    const rtl = rtlRef.current;
    const x = getXPosition(snapshot.x, snapshot.maxX, rtl);
    const y = getYPosition(snapshot.y, snapshot.maxY);

    if (snapshot.maxX === 0) {
      directionXRef.current = undefined;
      lastXRef.current = 0;
    } else {
      if (trackDirection && x !== lastXRef.current) {
        directionXRef.current = x > lastXRef.current ? "right" : "left";
      }
      lastXRef.current = x;
    }

    if (snapshot.maxY === 0) {
      directionYRef.current = undefined;
      lastYRef.current = 0;
    } else {
      if (trackDirection && y !== lastYRef.current) {
        directionYRef.current = y > lastYRef.current ? "down" : "up";
      }
      lastYRef.current = y;
    }

    commit({
      x,
      y,
      directionX: directionXRef.current,
      directionY: directionYRef.current,
      progressX: getProgressX(x, snapshot.maxX, rtl),
      progressY: getProgressY(y, snapshot.maxY),
    });
  });

  const [startRaf, cancelRaf] = useRaf(() => {
    scheduledRef.current = false;
    const trackDirection = trackDirectionRef.current;
    trackDirectionRef.current = false;
    update(trackDirection);
  });

  const schedule = usePersist((trackDirection: boolean) => {
    if (!scrollerRef.current) {
      return;
    }
    if (trackDirection) {
      trackDirectionRef.current = true;
    }
    // Coalesce every scroll/resize event into one update per frame.
    if (!scheduledRef.current) {
      scheduledRef.current = true;
      startRaf();
    }
  });

  useLayoutRefEffect(() => {
    const scroller = getScroller(target);
    const view = scroller?.ownerDocument.defaultView || null;

    scrollerRef.current = scroller;
    listenerRef.current = scroller ? getListenerTarget(scroller) : null;
    resizeRef.current = scroller && !isPageScroller(scroller) ? scroller : null;
    windowRef.current = scroller ? view : null;
    rtlRef.current = scroller ? isRtl(scroller) : false;

    cancelRaf();
    scheduledRef.current = false;
    trackDirectionRef.current = false;

    const destroy = () => {
      cancelRaf();
      scheduledRef.current = false;
      trackDirectionRef.current = false;
      scrollerRef.current = null;
      listenerRef.current = null;
      resizeRef.current = null;
      windowRef.current = null;
    };

    if (!scroller) {
      lastXRef.current = 0;
      lastYRef.current = 0;
      directionXRef.current = undefined;
      directionYRef.current = undefined;
      commit(createInitialState());
      return destroy;
    }

    const snapshot = getScrollSnapshot(scroller);
    const rtl = rtlRef.current;
    const x = getXPosition(snapshot.x, snapshot.maxX, rtl);
    const y = getYPosition(snapshot.y, snapshot.maxY);

    lastXRef.current = snapshot.maxX > 0 ? x : 0;
    lastYRef.current = snapshot.maxY > 0 ? y : 0;
    directionXRef.current = undefined;
    directionYRef.current = undefined;
    commit({
      x,
      y,
      directionX: undefined,
      directionY: undefined,
      progressX: getProgressX(x, snapshot.maxX, rtl),
      progressY: getProgressY(y, snapshot.maxY),
    });

    return destroy;
  }, [target, commit, cancelRaf]);

  useEventListener(listenerRef, "scroll", () => schedule(true), { passive: true });
  useEventListener(windowRef, "resize", () => schedule(false), { passive: true });
  useEventListener(windowRef, "pageshow", () => schedule(false), { passive: true });
  useResizeObserver(resizeRef, () => schedule(false));

  useDebugValue(state);

  return state;
}

export default useScroll;
