import type { RefObject } from "react";

import getPageScroller from "./getPageScroller";
import inBrowser from "./inBrowser";
import unref from "./unref";

/**
 * The element that scrolls: the given element or its ref, the page scroller by default, and
 * `null` when nothing is tracked or outside the browser.
 */
export default function getScroller(
  target?: Element | RefObject<Element | null> | null,
): Element | null {
  if (!inBrowser || target === null) {
    return null;
  }
  if (target === undefined) {
    return getPageScroller(document);
  }
  return unref(target);
}
