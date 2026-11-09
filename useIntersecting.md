# useIntersecting

Determine whether the target element intersects the viewport (or the specified `root`).

## API

```ts
function useIntersecting(
  target: Element | React.RefObject<Element | null>,
  options?: {
    root?: Element | Document | React.RefObject<Element | Document | null>;
    rootMargin?: string;
    threshold?: number | number[];
  },
): boolean;
```

Parameters:

- **`target`:** A DOM element to observe, or a ref object that references it.
- **`options`:** See [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver) options.

Results:

- A boolean indicating whether the target is intersecting with the root.

## Notes

- Returns `false` in non-browser environments.
- Resets to `false` when the target element becomes invalid.

## Example

The following example scrolls a container and highlights the target when it is fully visible.

```tsx
import { useRef } from "react";
import { useIntersecting } from "@lilib/hooks";

function Example() {
  const rootRef = useRef(null);
  const targetRef = useRef(null);

  const intersecting = useIntersecting(targetRef, {
    root: rootRef,
    threshold: 1,
  });

  return (
    <div ref={rootRef} style={{ height: 200, overflow: "auto" }}>
      <div
        ref={targetRef}
        style={{
          height: 100,
          marginTop: 150,
          marginBottom: 150,
          backgroundColor: intersecting ? "orange" : "transparent",
        }}
      >
        {intersecting ? "Complete intersection" : "Incomplete intersection"}
      </div>
    </div>
  );
}

export default Example;
```
