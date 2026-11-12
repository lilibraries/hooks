import type { RefObject } from "react";

import useEventListener from "./useEventListener";
import inBrowser from "./utils/inBrowser";
import isDevelopment from "./utils/isDevelopment";
import isEditableTarget from "./utils/isEditableTarget";
import matchesHotkey, { parseHotkey } from "./utils/matchesHotkey";
import unref from "./utils/unref";
import warn from "./utils/warn";

interface UseHotkeyOptions {
  /** Whether the hotkey is active. Defaults to `true`. */
  enabled?: boolean;
  /**
   * The event target that receives the listener: an element, `window`, `document`,
   * or a ref of them. Defaults to `document`.
   */
  target?: EventTarget | RefObject<EventTarget | null>;
  /** The keyboard event to listen for. Defaults to `"keydown"`. */
  eventName?: "keydown" | "keyup";
  /**
   * The `KeyboardEvent` field the key token is compared against: `"key"` (the
   * produced character) or `"code"` (the physical key position). Defaults to `"key"`.
   */
  eventField?: "key" | "code";
  /** Whether the hotkey fires again on key auto-repeat while it is held down. Defaults to `false`. */
  repeatable?: boolean;
  /**
   * Whether to also fire while the focus is in an editable element, such as a text
   * input, a textarea, a select or a content-editable element. Defaults to `false`.
   */
  allowInEditable?: boolean;
  /** Whether to call `preventDefault()` on the matched event. Defaults to `false`. */
  preventDefault?: boolean;
}

/**
 * Bind a keyboard shortcut to a callback.
 *
 * @param keys A hotkey string such as `"mod+shift+k"`, or an array of hotkey strings that all trigger the callback.
 * @param listener The callback invoked when the hotkey is pressed; it receives the keyboard event.
 * @param options The options object.
 */
function useHotkey(
  keys: string | string[],
  listener: (event: KeyboardEvent) => void,
  options?: UseHotkeyOptions,
) {
  const {
    enabled = true,
    target,
    eventName = "keydown",
    eventField = "key",
    repeatable = false,
    allowInEditable = false,
    preventDefault = false,
  } = options || {};

  const hotkeys = Array.isArray(keys) ? keys : [keys];

  // Report an invalid hotkey at mount rather than at the first key press. Producing the
  // warning is the only reason to parse while rendering, so this is dev-only.
  if (isDevelopment) {
    for (const hotkey of hotkeys) {
      if (!parseHotkey(hotkey)) {
        warn(
          false,
          '[useHotkey] Invalid hotkey `%s`; expected modifiers followed by a single key, e.g. "mod+shift+k".',
          hotkey,
        );
      }
    }
  }

  // Resolve the target when the listener is attached instead of while rendering:
  // refs are assigned during commit, so a ref that is still empty at render time
  // would otherwise fall back to `document`. Reading it lazily also makes `enabled`
  // toggle the listener on and off.
  const targetRef = {
    get current() {
      if (!inBrowser || !enabled) {
        return null;
      }
      // Fall back to `document` only when no target is given: a target whose
      // ref is not assigned yet stays detached instead of leaking to the whole page.
      return target === undefined ? document : unref(target);
    },
  };

  useEventListener<EventTarget, KeyboardEvent>(targetRef, eventName, (event) => {
    // The listener is detached in an effect, so a key press can still arrive between the
    // commit that disables the hotkey and the effect that removes the listener.
    if (!enabled) {
      return;
    }

    if (!repeatable && event.repeat) {
      return;
    }

    if (!allowInEditable && isEditableTarget(event.target)) {
      return;
    }

    if (!hotkeys.some((hotkey) => matchesHotkey(event, hotkey, eventField))) {
      return;
    }

    if (preventDefault) {
      event.preventDefault();
    }

    listener(event);
  });
}

export default useHotkey;
