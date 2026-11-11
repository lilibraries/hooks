import type { Keystroke } from "./parseKeystroke";

/**
 * Tell whether a keyboard event is produced by the given keystroke, ignoring modifiers.
 *
 * @param event The keyboard event.
 * @param keystroke The parsed keystroke to compare against.
 * @param eventField The `KeyboardEvent` field the keystroke is compared against: `"key"`
 *   (the produced character) or `"code"` (the physical key position).
 * @returns Returns `true` if the event is produced by the keystroke, otherwise `false`.
 */
export default function matchesKeystroke(
  event: KeyboardEvent,
  keystroke: Keystroke,
  eventField: "key" | "code" = "key",
) {
  // Ignore keystrokes produced by an IME composition, such as typing Chinese.
  if (event.isComposing || event.keyCode === 229) {
    return false;
  }

  return eventField === "code"
    ? event.code.toLowerCase() === keystroke.code
    : event.key.toLowerCase() === keystroke.key;
}
