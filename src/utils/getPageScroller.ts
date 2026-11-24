/** The element that scrolls the document: the root element, or the body in quirks mode. */
export default function getPageScroller(document: Document) {
  return document.scrollingElement || document.documentElement;
}
