import isPageScroller from "./isPageScroller";

/**
 * The target that receives a scroller's scroll events: page scroll events are dispatched on the
 * window rather than on the scrolling element.
 */
export default function getScrollListenerTarget(scroller: Element): EventTarget {
  if (isPageScroller(scroller)) {
    return scroller.ownerDocument.defaultView || scroller;
  }
  return scroller;
}
