# useCopyToClipboard

Copy text to the clipboard and track whether a copy just succeeded.

## API

```ts
function useCopyToClipboard(
  resetTimeout?: number,
): [copied: boolean, copy: (text: string) => Promise<boolean>];
```

Parameters:

- **`resetTimeout`:** The time (milliseconds) `copied` stays `true` after a successful copy. Default is `1000`.

Results:

- **`copied`:** Whether a copy succeeded within the last `resetTimeout` milliseconds.
- **`copy`:** Copy `text` to the clipboard and return a `Promise` that resolves with whether it succeeded.

## Notes

- The async Clipboard API requires a secure context (`https` or `localhost`). Outside of it, the hook falls back to `document.execCommand("copy")`, which is deprecated, and resolves `false` when neither is available.
- A failed copy neither changes `copied` nor interrupts a pending reset.

## Example

The following example copies the text in the input and shows feedback with the default `resetTimeout`.

```tsx
import { useState } from "react";
import { useCopyToClipboard } from "@lilib/hooks";

function Example() {
  const [text, setText] = useState("Hello, @lilib/hooks!");
  const [copied, copy] = useCopyToClipboard();

  return (
    <div>
      <input value={text} onChange={(event) => setText(event.target.value)} />{" "}
      <button onClick={() => copy(text)}>{copied ? "Copied!" : "Copy"}</button>
    </div>
  );
}

export default Example;
```
