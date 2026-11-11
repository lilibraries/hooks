# useHotkey

Bind a keyboard shortcut to a callback.

## API

```ts
function useHotkey(
  keys: string | string[],
  listener: (event: KeyboardEvent) => void,
  options?: {
    enabled?: boolean;
    target?: EventTarget | React.RefObject<EventTarget | null>;
    eventName?: "keydown" | "keyup";
    eventField?: "key" | "code";
    repeatable?: boolean;
    allowInEditable?: boolean;
    preventDefault?: boolean;
  },
): void;
```

Parameters:

- **`keys`:** A hotkey string, or an array of hotkey strings that all trigger the listener. A hotkey string consists of modifiers joined with `+` followed by a single key, for example `"mod+shift+k"`. Supported modifiers are `ctrl` (`control`), `alt` (`option`), `shift`, `meta` (`cmd`, `command`) and `mod`. The key is a `KeyboardEvent.key` value (or a `KeyboardEvent.code` name when `options.eventField` is `"code"`) and is case-insensitive; the aliases `esc`, `space`, `plus`, `up`, `down`, `left` and `right` are also accepted.
- **`listener`:** The callback invoked when a hotkey is pressed; it receives the keyboard event.
- **`options`:** Options object.
  - **`options.enabled`:** Whether the hotkey is active. Default is `true`.
  - **`options.target`:** The event target that receives the listener: an element, `window`, `document`, or a ref of them. Default is `document`.
  - **`options.eventName`:** The keyboard event to listen for. Default is `"keydown"`.
  - **`options.eventField`:** The `KeyboardEvent` field the key token is compared against: `"key"` (the produced character) or `"code"` (the physical key position). Default is `"key"`.
  - **`options.repeatable`:** Whether to fire again on key auto-repeat while the key is held down. Default is `false`.
  - **`options.allowInEditable`:** Whether to fire while the focus is in an editable element, such as a text input, a textarea, a select or a content-editable element. Default is `false`.
  - **`options.preventDefault`:** Whether to call `preventDefault()` on the matched event. Default is `false`.

## Notes

- Modifiers must match exactly: pressing `k` with both Control and Meta held does not fire a `"ctrl+k"` hotkey.
- `mod` resolves to Command on Apple platforms and to Control everywhere else, so `"mod+k"` works on every operating system.
- When `target` is a ref that is not assigned yet, no listener is attached: the hotkey never falls back to `document`.
- Inputs that do not accept text, such as checkboxes, radio buttons and range inputs, do not block hotkeys, so shortcuts keep working while they are focused.
- A `target` that is itself editable is still filtered by `allowInEditable`: binding a shortcut to a text field needs `allowInEditable: true`.
- On macOS, Option changes the reported character (`Option` + `C` produces `ç`), so `alt` shortcuts must use `eventField: "code"` to match; prefer letter keys with `mod` or `ctrl` for cross-platform shortcuts.
- With `eventField: "code"`, key tokens are `KeyboardEvent.code` names: letters and digits are converted automatically (`a` becomes `KeyA`, `1` becomes `Digit1`), while other keys are written as their code, such as `comma`, `equal` and `arrowup`.
- The `+` key is written as `plus`, and because `+` requires Shift on most layouts, bind it as `shift+plus`. With `eventField: "code"` use the physical name instead, such as `shift+equal`.
- Keystrokes produced during an IME composition are ignored.
- Sequences such as `g i` and scopes are not supported. Call the hook once per shortcut and use `enabled` to turn a group of shortcuts on and off together.

## Example

The following example counts how many times the shortcut is pressed.

```tsx
import { useState } from "react";
import { useHotkey } from "@lilib/hooks";

function Example() {
  const [count, setCount] = useState(0);

  useHotkey(
    "mod+a",
    () => {
      setCount((value) => value + 1);
    },
    { preventDefault: true },
  );

  return (
    <>
      Press <kbd>Ctrl</kbd> + <kbd>A</kbd> (or <kbd>⌘</kbd> + <kbd>A</kbd>) to count: {count}
    </>
  );
}

export default Example;
```
