# useLayoutRefUpdate

This hook is similar to [`useLayoutUpdate`](useLayoutUpdate.md), but it is built on [`useLayoutRefEffect`](useLayoutRefEffect.md) internally, so ReactRefs in the dependency array are dereferenced to `ref.current` before comparison. It runs synchronously before the browser paints (layout phase).

## API

```ts
function useLayoutRefUpdate(effect: React.EffectCallback, deps?: React.DependencyList): void;
```

Parameters:

- **`effect`:** The effect to run after an update. It may return a cleanup function.
- **`deps`:** The dependency array. Its elements can be plain values or ReactRefs.

## Notes

- Plain objects with a `current` property are treated as ReactRefs and dereferenced, so they cannot be used as dependency values directly.

## Example

The following example measures the height after the content changes, before the browser paints.

```tsx
import { useRef, useState } from "react";
import { useLayoutRefUpdate } from "@lilib/hooks";

function Example() {
  const [long, setLong] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();

  useLayoutRefUpdate(() => {
    // Re-runs when the element that `domRef` points to changes,
    // measured synchronously before the browser paints.
    if (domRef.current) {
      setHeight(domRef.current.offsetHeight);
    }
  }, [domRef, long]);

  return (
    <>
      <div>
        <button onClick={() => setLong((long) => !long)}>Toggle content</button>
      </div>
      <div ref={domRef} style={{ padding: 16, backgroundColor: "rgba(255, 165, 0, 0.3)" }}>
        {long ? "A much longer piece of content" : "Short"}
      </div>
      <div>Measured height: {height ?? "—"}px</div>
    </>
  );
}

export default Example;
```
