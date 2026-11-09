# useRerender

This hook returns a function that you can use to re-render the component. It is usually used to re-render mutable data.

## API

```ts
function useRerender(): () => void;
```

## Notes

- This is an escape hatch for mutable data; prefer state for values that affect rendering.
- Do not call it during render.

## Example

The following example updates a mutable value outside React state and re-renders to display it.

```tsx
import { useRef } from "react";
import { useRerender } from "@lilib/hooks";

function Example() {
  // A mutable value that lives outside React state.
  const countRef = useRef(0);
  const rerender = useRerender();

  function handleClick() {
    countRef.current++;
    rerender();
  }

  return (
    <>
      <button onClick={handleClick}>+1</button> {countRef.current}
    </>
  );
}

export default Example;
```
