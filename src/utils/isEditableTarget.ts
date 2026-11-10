// Input types that do not accept text, so character keys pressed on them are not
// typed into a field and can still trigger shortcuts.
const NON_TEXT_INPUT_TYPES = [
  "button",
  "checkbox",
  "color",
  "file",
  "hidden",
  "image",
  "radio",
  "range",
  "reset",
  "submit",
];

/**
 * Walk up to the nearest `contenteditable` declaration and tell whether it makes the
 * element editable. A missing attribute and `"inherit"` both defer to the ancestor,
 * so a `contenteditable="false"` island inside an editable region stays non-editable.
 */
function isContentEditable(target: Element) {
  for (let node: Element | null = target; node; node = node.parentElement) {
    const value = node.getAttribute("contenteditable")?.toLowerCase() ?? null;

    if (value === null || value === "inherit") {
      continue;
    }

    return value !== "false";
  }

  return false;
}

/**
 * Tell whether an event target is an editable element, i.e. whether a character key
 * pressed on it is typed into a field instead of triggering a shortcut.
 *
 * @param target The event target.
 * @returns Returns `true` for text inputs, textareas, selects and content-editable elements.
 */
export default function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return false;
  }

  const tagName = target.tagName.toLowerCase();

  if (tagName === "input") {
    return !NON_TEXT_INPUT_TYPES.includes((target as HTMLInputElement).type.toLowerCase());
  }

  if (tagName === "textarea" || tagName === "select") {
    return true;
  }

  return isContentEditable(target);
}
