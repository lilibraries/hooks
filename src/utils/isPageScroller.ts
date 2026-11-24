import getPageScroller from "./getPageScroller";

/** Whether an element scrolls its whole document rather than its own content. */
export default function isPageScroller(element: Element) {
  return element === getPageScroller(element.ownerDocument);
}
