# useResizeObserver

Observe an element's size changes.

## API

```ts
function useResizeObserver(
  target: Element | React.RefObject<Element | null>,
  listener: (entries: ResizeObserverEntry[]) => void,
): void;
```

Parameters:

- **`target`:** A DOM element to observe, or a ref object that references it.
- **`listener`:** Listener function.

## Notes

- The `resize-observer-polyfill` is always used (it does not delegate to the native implementation); mind the performance cost for high-frequency resizes.
- The listener attaches once the target element is mounted; a ref that is still `null` is fine.

## Example

The following example counts resize events when the element size changes.

```tsx
import { useRef, useState } from "react";
import { useResizeObserver } from "@lilib/hooks";

function Example() {
  const [wide, setWide] = useState(false);
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useResizeObserver(containerRef, () => {
    setCount((count) => count + 1);
  });

  return (
    <>
      <div>
        <button onClick={() => setWide((wide) => !wide)}>Toggle size</button>
      </div>
      <div
        ref={containerRef}
        style={{
          padding: 16,
          width: wide ? "100%" : "50%",
          backgroundColor: "rgba(255, 165, 0, 0.3)",
        }}
      >
        Resized times: {count}
      </div>
    </>
  );
}

export default Example;
```
