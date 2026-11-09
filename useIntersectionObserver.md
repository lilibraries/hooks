# useIntersectionObserver

Observe when an element's intersection with another element or the viewport changes.

## API

```ts
function useIntersectionObserver(
  target: Element | React.RefObject<Element | null>,
  listener: (entries: IntersectionObserverEntry[]) => void,
  options?: {
    root?: Element | Document | React.RefObject<Element | Document | null>;
    rootMargin?: string;
    threshold?: number | number[];
  },
): void;
```

Parameters:

- **`target`:** A DOM element to observe, or a ref object that references it.
- **`listener`:** Listener function.
- **`options`:** See [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver) options.

## Notes

- Observes through a layout effect: the observer is created before the browser paints.
- The observer attaches once the target element is mounted; a ref that is still `null` is fine.
- An array `threshold` is compared by content, so inline arrays do not recreate the observer on every render.

## Example

The following example scrolls a container and highlights the target when it is fully visible.

```tsx
import { useRef, useState } from "react";
import { useIntersectionObserver } from "@lilib/hooks";

function Example() {
  const [intersecting, setIntersecting] = useState(false);
  const rootRef = useRef(null);
  const targetRef = useRef(null);

  useIntersectionObserver(
    targetRef,
    (entries) => {
      if (entries && entries[0] && entries[0].isIntersecting) {
        setIntersecting(true);
      } else {
        setIntersecting(false);
      }
    },
    { root: rootRef, threshold: 1 },
  );

  return (
    <div
      ref={rootRef}
      style={{
        height: 200,
        overflow: "auto",
      }}
    >
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
