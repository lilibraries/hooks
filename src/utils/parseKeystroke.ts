// Aliases for the keystroke tokens that are awkward to write in a hotkey string.
const TOKEN_ALIASES = new Map<string, string>([
  ["esc", "escape"],
  ["space", " "],
  ["plus", "+"],
  ["up", "arrowup"],
  ["down", "arrowdown"],
  ["left", "arrowleft"],
  ["right", "arrowright"],
]);

/** The logical and physical identifiers of a single keystroke. */
export interface Keystroke {
  /** The logical key, compared with `KeyboardEvent.key`. */
  key: string;
  /** The physical key, compared with `KeyboardEvent.code`. */
  code: string;
}

/**
 * Convert a logical key to its `KeyboardEvent.code` value: letters and digits are
 * prefixed (`s` → `KeyS`), other keys are already spelled like their code (`escape`),
 * and physical names (`keya`, `digit1`, `equal`) are passed through unchanged.
 */
function toCode(key: string) {
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

/**
 * Parse the textual form of a keystroke, such as `"esc"`, `"A"` or `"arrowup"`, into the
 * identifiers compared with `KeyboardEvent.key` and `KeyboardEvent.code`.
 *
 * @param token The keystroke token; it is case-insensitive.
 * @returns Returns the logical key and the physical code of the keystroke.
 */
export default function parseKeystroke(token: string): Keystroke {
  const key = TOKEN_ALIASES.get(token.toLowerCase()) ?? token.toLowerCase();

  return { key, code: toCode(key) };
}
