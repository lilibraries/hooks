import type { RefObject } from "react";

import useLayoutRefEffect from "./useLayoutRefEffect";
import inBrowser from "./utils/inBrowser";
import unref from "./utils/unref";

interface UseScrollLockOptions {
  /**
   * The element (or its ref) whose scrolling is locked. Defaults to the page scroll
   * container (`document.scrollingElement`, falling back to `document.documentElement`);
   * pass `null` to lock nothing. A ref is read when the effect runs, so an element
   * assigned after the first render is locked on the next one.
   */
  target?: Element | RefObject<Element | null> | null;
  /** Whether the lock is active. Defaults to `true`. */
  enabled?: boolean;
}

interface LockRecord {
  /** How many hook instances hold this element locked. */
  count: number;
  /** Inline styles to restore when the last lock is released. */
  overflowX: string;
  overflowY: string;
  /** The side the scrollbar space is compensated on, if any. */
  paddingSide: "paddingLeft" | "paddingRight";
  padding: string;
}

// One record per element, so an element is restored only after its last lock is
// released. A WeakMap lets removed elements be garbage collected.
const records = new WeakMap<Element, LockRecord>();

interface ScrollbarWidths {
  /** The width the element's own scrollbar occupies. */
  element: number;
  /** The width the page scrollbar occupies. */
  viewport: number;
}

function getScrollbarWidths(element: Element): ScrollbarWidths {
  const doc = element.ownerDocument;
  const view = doc.defaultView;

  if (!view) {
    return { element: 0, viewport: 0 };
  }

  const style = view.getComputedStyle(element);
  return {
    element: Math.max(
      (element as HTMLElement).offsetWidth -
        element.clientWidth -
        (parseFloat(style.borderLeftWidth) || 0) -
        (parseFloat(style.borderRightWidth) || 0),
      0,
    ),
    viewport: Math.max(view.innerWidth - doc.documentElement.clientWidth, 0),
  };
}

function lock(element: Element) {
  const existing = records.get(element);
  if (existing) {
    existing.count += 1;
    return;
  }

  const node = element as HTMLElement;
  const before = getScrollbarWidths(element);
  const record: LockRecord = {
    count: 1,
    overflowX: node.style.overflowX,
    overflowY: node.style.overflowY,
    paddingSide: "paddingRight",
    padding: node.style.paddingRight,
  };

  records.set(element, record);

  node.style.overflowX = "hidden";
  node.style.overflowY = "hidden";

  // Compensate only the space that actually disappeared: the element's own scrollbar,
  // or the page scrollbar the element's overflow is propagated to (a `body` lock in
  // standards mode). A scrollbar that stays in place, as with `scrollbar-gutter:
  // stable`, yields a zero difference and is not compensated.
  const after = getScrollbarWidths(element);
  const elementGap = before.element - after.element;
  const viewportGap = before.viewport - after.viewport;
  const gap = Math.max(elementGap, viewportGap, 0);
  if (gap > 0) {
    const doc = element.ownerDocument;
    const view = doc.defaultView;
    // A vertical scrollbar sits on the left in right-to-left layouts; the side follows
    // the container that owned the disappeared scrollbar.
    const directionSource = viewportGap > elementGap ? doc.documentElement : element;
    const side =
      view?.getComputedStyle(directionSource).direction === "rtl" ? "paddingLeft" : "paddingRight";

    record.paddingSide = side;
    record.padding = node.style[side];
    node.style[side] =
      `${((view && parseFloat(view.getComputedStyle(element)[side])) || 0) + gap}px`;
  }
}

function unlock(element: Element) {
  const record = records.get(element);
  if (!record) {
    return;
  }

  record.count -= 1;
  if (record.count > 0) {
    return;
  }

  records.delete(element);

  const node = element as HTMLElement;
  node.style.overflowX = record.overflowX;
  node.style.overflowY = record.overflowY;
  node.style[record.paddingSide] = record.padding;
}

/**
 * Lock scrolling of a container while `enabled` is `true`, and restore the previous
 * styles when the lock is released or the component unmounts.
 *
 * @param options The options object.
 * @param options.target The element (or its ref) to lock; defaults to the page scroll
 * container (`document.scrollingElement`, falling back to `document.documentElement`),
 * pass `null` to lock nothing. A ref is read when the effect runs, so an element assigned
 * after the first render is locked on the next one.
 * @param options.enabled Whether the lock is active. Defaults to `true`.
 */
function useScrollLock(options?: UseScrollLockOptions) {
  const { target, enabled = true } = options || {};

  // `useLayoutRefEffect` dereferences refs before comparing deps, so a ref that is
  // still unassigned when the effect runs locks on the next render after assignment.
  useLayoutRefEffect(() => {
    if (!inBrowser || !enabled || target === null) {
      return;
    }

    const element =
      target === undefined ? document.scrollingElement || document.documentElement : unref(target);
    if (!element) {
      return;
    }

    lock(element);

    return () => {
      unlock(element);
    };
  }, [target, enabled]);
}

export default useScrollLock;
