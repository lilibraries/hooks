import { useDebugValue, useRef } from "react";
import type { RefObject } from "react";

import warning from "warning";

import useEventListener from "./useEventListener";
import useLayoutUpdate from "./useLayoutUpdate";
import useSafeState from "./useSafeState";
import inBrowser from "./utils/inBrowser";
import isPageVisible from "./utils/isPageVisible";
import matchesKeystroke from "./utils/matchesKeystroke";
import parseKeystroke from "./utils/parseKeystroke";
import unref from "./utils/unref";

export interface UseKeyPressedOptions {
  /** Whether to track the key. Defaults to `true`. */
  enabled?: boolean;
  /**
   * The event target that receives the `keydown` listener: an element, `window`,
   * `document`, or a ref of them. Defaults to `document`.
   */
  target?: EventTarget | RefObject<EventTarget | null>;
  /**
   * The `KeyboardEvent` field the key token is compared against: `"key"` (the
   * produced character) or `"code"` (the physical key position). Defaults to `"key"`.
   */
  eventField?: "key" | "code";
}

// Key tokens are usually literals, so a plain set is enough to report each typo once.
const WARNED_KEYS_LIMIT = 200;
const warnedKeys = new Set<string>();

// A physical position that cannot be identified, like an empty code, cannot be tracked.
function normalizeCode(code: string) {
  const normalized = code.toLowerCase();

  return normalized === "unidentified" ? "" : normalized;
}

function warnInvalidKeys(keyList: string[]) {
  for (const key of keyList) {
    // `"+"` is itself a key; any other token containing `+` is a shortcut, not a key.
    if (key === "+" || !key.includes("+") || warnedKeys.has(key)) {
      continue;
    }

    // The cap only guards against generated tokens, mirroring `parseHotkey`.
    if (warnedKeys.size >= WARNED_KEYS_LIMIT) {
      warnedKeys.clear();
    }

    warnedKeys.add(key);
    warning(
      false,
      "[useKeyPressed] Invalid key `%s`; key tokens do not take modifiers, use `useHotkey` for shortcuts.",
      key,
    );
  }
}

/**
 * Detect whether keys are currently held down.
 *
 * Modifiers are not part of the key token and are ignored when matching, so holding
 * `Shift` while pressing `K` still reports `"k"` as pressed. Modifier keys themselves
 * are ordinary keys, such as `"control"`, `"shift"`, `"alt"` and `"meta"`.
 *
 * @param keys A key token such as `"shift"`, `"space"` or `"a"`, or an array of tokens
 *   where any of them being held down reports `true`.
 * @param options The options object.
 * @returns Returns `true` if any of the keys is held down, otherwise `false`.
 */
function useKeyPressed(keys: string | string[], options?: UseKeyPressedOptions) {
  const { enabled = true, target, eventField = "key" } = options || {};

  const keyList = Array.isArray(keys) ? keys : [keys];
  const keystrokes = keyList.map(parseKeystroke);

  warnInvalidKeys(keyList);

  // Maps the physical key a press was recorded with (or its keystroke without a physical
  // key) to the keystroke it matched.
  const pressedKeysRef = useRef(new Map<string, string>());
  const [pressed, setPressed] = useSafeState(false);

  // Resolve the targets when the listener is attached instead of while rendering, and
  // return `null` while disabled so the listeners are really detached rather than
  // short-circuited inside the handlers.
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
  const documentRef = {
    get current() {
      return inBrowser && enabled ? document : null;
    },
  };
  const windowRef = {
    get current() {
      return inBrowser && enabled ? window : null;
    },
  };

  const reset = () => {
    pressedKeysRef.current.clear();
    setPressed(false);
  };

  useEventListener<EventTarget, KeyboardEvent>(targetRef, "keydown", (event) => {
    // The listener is detached in an effect, so a key press can still arrive between the
    // commit that disables the hook and the effect that removes the listener.
    if (!enabled) {
      return;
    }

    const matched = keystrokes.find((keystroke) => matchesKeystroke(event, keystroke, eventField));

    if (!matched) {
      return;
    }

    const code = normalizeCode(event.code);
    // The press is recorded under the physical key: it stays the same while the key is held,
    // so a changed logical key (e.g. Shift was pressed meanwhile) overwrites the same record
    // and two physical keys producing the same logical key stay apart. Input without a
    // physical position is recorded under its keystroke instead, and the prefix keeps both
    // kinds of records apart.
    const recordKey = code ? `code:${code}` : `key:${matched.key}`;

    // Repeated events, including the auto-repeat of a held key, are no-ops. `event.repeat`
    // is deliberately not checked: after the state is reset (e.g. the window lost focus),
    // auto-repeat is the only signal that the key is still held down.
    if (pressedKeysRef.current.get(recordKey) === matched.key) {
      return;
    }

    pressedKeysRef.current.set(recordKey, matched.key);
    setPressed(true);
  });

  // Releases are tracked on the document: once the focus leaves the target, the target
  // no longer receives `keyup` and the key would stay pressed forever.
  useEventListener<Document, KeyboardEvent>(documentRef, "keyup", (event) => {
    const code = normalizeCode(event.code);

    // The release removes the record of its own physical key, so it needs no key matching:
    // this holds when the logical key changed during the hold and when two physical keys
    // produce the same logical key.
    let released = code ? pressedKeysRef.current.delete(`code:${code}`) : false;

    if (!code) {
      // Input without a physical position is recorded under its keystroke instead. Releases
      // never cross the two kinds of records: a record created with a physical key may
      // belong to a key that is still held down.
      const matched = keystrokes.find((keystroke) =>
        matchesKeystroke(event, keystroke, eventField),
      );

      if (!matched) {
        return;
      }

      released = pressedKeysRef.current.delete(`key:${matched.key}`);
    }

    if (!released) {
      return;
    }

    const pressedKeys = new Set(pressedKeysRef.current.values());
    setPressed(keystrokes.some((keystroke) => pressedKeys.has(keystroke.key)));
  });

  // No `keyup` is delivered after the window loses focus or the page is hidden.
  useEventListener(windowRef, "blur", reset);

  useEventListener(documentRef, "visibilitychange", () => {
    if (!isPageVisible()) {
      reset();
    }
  });

  // The recorded keys belong to the previous keys, event field or enabled state. The target
  // is not a dependency: a ref that is assigned after the first render is not a change of
  // tracking, and a released key is always reported by the document-level listener.
  useLayoutUpdate(reset, [keyList.join("\n"), eventField, enabled]);

  useDebugValue(pressed);

  // Also cover the commit in which `enabled` turns false, before `reset` runs.
  return enabled && pressed;
}

export default useKeyPressed;
