/** Whether an element resolves to a right-to-left writing direction. */
export default function isRtl(element: Element) {
  const view = element.ownerDocument.defaultView;
  return !!view && view.getComputedStyle(element).direction === "rtl";
}
