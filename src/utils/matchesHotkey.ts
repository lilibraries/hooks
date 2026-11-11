import inBrowser from "./inBrowser";
import matchesKeystroke from "./matchesKeystroke";
import parseKeystroke, { type Keystroke } from "./parseKeystroke";

type Modifier = "ctrl" | "alt" | "shift" | "meta" | "mod";

interface Hotkey extends Keystroke {
  ctrl: boolean;
  alt: boolean;
  shift: boolean;
  meta: boolean;
  mod: boolean;
}

const MODIFIER_ALIASES = new Map<string, Modifier>([
  ["ctrl", "ctrl"],
  ["control", "ctrl"],
  ["alt", "alt"],
  ["option", "alt"],
  ["shift", "shift"],
  ["meta", "meta"],
  ["cmd", "meta"],
  ["command", "meta"],
  ["mod", "mod"],
]);

/**
 * Detect whether `mod` stands for the Meta key (Apple platforms) or the Control key.
 * It is evaluated on every call rather than cached at module scope, so it stays
 * SSR-safe, remains stubbable in tests, and costs nothing for hotkeys without `mod`.
 */
function isApplePlatform() {
  return inBrowser && /mac|iphone|ipad|ipod/i.test(navigator.userAgent);
}

/**
 * Parse a hotkey string such as `"mod+shift+k"` into the modifier flags and the
 * keystroke it matches. Exported so `useHotkey` can validate its `keys` while rendering.
 *
 * @param hotkey The hotkey string.
 * @returns Returns the parsed hotkey, or `null` when the string is invalid.
 */
export function parseHotkey(hotkey: string) {
  const parsed: Hotkey = {
    ctrl: false,
    alt: false,
    shift: false,
    meta: false,
    mod: false,
    key: "",
    code: "",
  };
  let keystrokeToken = "";

  for (const token of hotkey.toLowerCase().split("+")) {
    const modifier = MODIFIER_ALIASES.get(token);

    if (modifier) {
      parsed[modifier] = true;
    } else if (!token || keystrokeToken) {
      return null;
    } else {
      keystrokeToken = token;
    }
  }

  if (!keystrokeToken) {
    return null;
  }

  return Object.assign(parsed, parseKeystroke(keystrokeToken));
}

/**
 * Tell whether a keyboard event matches a hotkey string such as `"mod+shift+k"`.
 *
 * @param event The keyboard event.
 * @param hotkey The hotkey string: modifiers joined with `+` followed by a single key,
 *   where `mod` means Command on Apple platforms and Control elsewhere.
 * @param eventField The `KeyboardEvent` field the key token is compared against:
 *   `"key"` (the produced character) or `"code"` (the physical key position).
 * @returns Returns `true` if the event matches the hotkey, otherwise `false`.
 */
export default function matchesHotkey(
  event: KeyboardEvent,
  hotkey: string,
  eventField: "key" | "code" = "key",
) {
  const parsed = parseHotkey(hotkey);

  if (!parsed) {
    return false;
  }

  const apple = parsed.mod && isApplePlatform();
  const ctrl = parsed.ctrl || (parsed.mod && !apple);
  const meta = parsed.meta || apple;

  // Modifiers must match exactly: pressing an extra modifier key does not fire the hotkey.
  if (
    event.ctrlKey !== ctrl ||
    event.metaKey !== meta ||
    event.altKey !== parsed.alt ||
    event.shiftKey !== parsed.shift
  ) {
    return false;
  }

  return matchesKeystroke(event, parsed, eventField);
}
