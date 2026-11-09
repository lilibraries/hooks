# useElementSize

Get the size of a DOM element.

## API

```ts
function useElementSize(target: Element | React.RefObject<Element | null>): {
  width: number | undefined;
  height: number | undefined;
};
```

Parameters:

- **`target`:** A DOM element, or a ref object that references a DOM element.

Results:

- **`width`:** Element width, or `undefined` when the target is invalid.
- **`height`:** Element height, or `undefined` when the target is invalid.

## Notes

- The size comes from `getBoundingClientRect`: it includes padding and border, excludes margin, is affected by transforms, and may be fractional.
- Both values are `undefined` until the target element is mounted.

## Example

The following example shows the element size; click Toggle size to see it change.

```tsx
import { useRef, useState } from "react";
import { useElementSize } from "@lilib/hooks";

function Example() {
  const [wide, setWide] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { width = 0, height = 0 } = useElementSize(ref);

  return (
    <>
      <div>
        <button onClick={() => setWide((wide) => !wide)}>Toggle size</button>
      </div>
      <div
        ref={ref}
        style={{
          padding: 16,
          width: wide ? "100%" : "50%",
          border: "1px solid rgba(128, 128, 128, 0.25)",
        }}
      >
        Element size: {JSON.stringify({ width, height })}
      </div>
    </>
  );
}

export default Example;
```
