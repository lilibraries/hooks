import warning from "warning";

import inBrowser from "./inBrowser";

type Modifier = "ctrl" | "alt" | "shift" | "meta" | "mod";

interface ParsedHotkey {
  ctrl: boolean;
  alt: boolean;
  shift: boolean;
  meta: boolean;
  mod: boolean;
  /** The normalized logical key, compared with `KeyboardEvent.key`. */
  key: string;
  /** The normalized physical key, compared with `KeyboardEvent.code`. */
  code: string;
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

// Aliases for the keys that are awkward to write in a hotkey string.
const KEY_ALIASES = new Map<string, string>([
  ["esc", "escape"],
  ["space", " "],
  ["plus", "+"],
  ["up", "arrowup"],
  ["down", "arrowdown"],
  ["left", "arrowleft"],
  ["right", "arrowright"],
]);

const PARSED_CACHE_LIMIT = 200;
const parsedCache = new Map<string, ParsedHotkey | null>();

/**
 * Detect whether `mod` stands for the Meta key (Apple platforms) or the Control key.
 * It is evaluated on every call rather than cached at module scope, so it stays
 * SSR-safe, remains stubbable in tests, and costs nothing for hotkeys without `mod`.
 */
function isApplePlatform() {
  return inBrowser && /mac|iphone|ipad|ipod/i.test(navigator.userAgent);
}

/**
 * Convert a logical key to its `KeyboardEvent.code` value: letters and digits are
 * prefixed (`s` → `KeyS`), other keys are already spelled like their code (`escape`),
 * and physical names (`keya`, `digit1`, `equal`) are passed through unchanged.
 */
function toCodeName(key: string) {
  if (key === " ") {
    return "space";
  }
  if (/^[a-z]$/.test(key)) {
    return `key${key}`;
  }
  if (/^[0-9]$/.test(key)) {
    return `digit${key}`;
  }
  return key;
}

function createHotkey(hotkey: string) {
  const parsed: ParsedHotkey = {
    ctrl: false,
    alt: false,
    shift: false,
    meta: false,
    mod: false,
    key: "",
    code: "",
  };
  let keyToken = "";

  for (const token of hotkey.toLowerCase().split("+")) {
    const modifier = MODIFIER_ALIASES.get(token);

    if (modifier) {
      parsed[modifier] = true;
    } else if (!token || keyToken) {
      return null;
    } else {
      keyToken = token;
    }
  }

  if (!keyToken) {
    return null;
  }

  parsed.key = KEY_ALIASES.get(keyToken) ?? keyToken;
  parsed.code = toCodeName(parsed.key);

  return parsed;
}

/**
 * Resolve a hotkey string, reporting an invalid one once. Exported so `useHotkey` can
 * validate its `keys` while rendering and surface a typo at mount instead of at the
 * first key press.
 *
 * @param hotkey The hotkey string.
 * @returns Returns the parsed hotkey, or `null` when the string is invalid.
 */
export function parseHotkey(hotkey: string) {
  if (!parsedCache.has(hotkey)) {
    const parsed = createHotkey(hotkey);

    if (!parsed) {
      warning(
        false,
        '[useHotkey] Invalid hotkey `%s`; expected modifiers followed by a single key, e.g. "mod+shift+k".',
        hotkey,
      );
    }

    // Hotkey strings are usually literals; the cap only guards against generated ones.
    if (parsedCache.size >= PARSED_CACHE_LIMIT) {
      parsedCache.clear();
    }

    parsedCache.set(hotkey, parsed);
  }

  return parsedCache.get(hotkey) ?? null;
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
  // Ignore keystrokes produced by an IME composition, such as typing Chinese.
  if (event.isComposing || event.keyCode === 229) {
    return false;
  }

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

  return eventField === "code"
    ? event.code.toLowerCase() === parsed.code
    : event.key.toLowerCase() === parsed.key;
}
