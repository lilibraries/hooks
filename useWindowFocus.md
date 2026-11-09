# useWindowFocus

Detect whether the `window` has focus. In a non-browser environment, it always returns `false`.

## API

```ts
function useWindowFocus(): boolean;
```

Results:

- Returns `true` if the `window` has focus, otherwise `false`.

## Notes

- `document.hasFocus()` also returns `true` when a nested iframe has focus.

## Example

The following example shows a notice when the window loses focus.

```tsx
import { useWindowFocus } from "@lilib/hooks";

function Example() {
  const focus = useWindowFocus();

  return (
    <div style={{ padding: 8, backgroundColor: focus ? "#d4edda" : "#fff3cd" }}>
      {focus ? "The window has focus" : "The window lost focus"}
    </div>
  );
}

export default Example;
```
