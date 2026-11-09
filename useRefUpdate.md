# useRefUpdate

This hook is similar to [`useUpdate`](useUpdate.md), but it is built on [`useRefEffect`](useRefEffect.md) internally, so ReactRefs in the dependency array are dereferenced to `ref.current` before comparison. It is useful when the ref target itself is an update dependency.

## API

```ts
function useRefUpdate(effect: React.EffectCallback, deps?: React.DependencyList): void;
```

Parameters:

- **`effect`:** The effect to run after an update. It may return a cleanup function.
- **`deps`:** The dependency array. Its elements can be plain values or ReactRefs.

## Notes

- Plain objects with a `current` property are treated as ReactRefs and dereferenced, so they cannot be used as dependency values directly.

## Example

The following example measures the width whenever the element is re-attached.

```tsx
import { useRef, useState } from "react";
import { useRefUpdate } from "@lilib/hooks";

function Example() {
  const [show, setShow] = useState(true);
  const domRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>();

  useRefUpdate(() => {
    // Re-runs whenever the element that `domRef` points to is (re)attached.
    if (domRef.current) {
      setWidth(domRef.current.offsetWidth);
    }
  }, [domRef]);

  return (
    <>
      <div>
        <button onClick={() => setShow((show) => !show)}>Toggle element</button>
      </div>
      {show && <div ref={domRef}>Measured element</div>}
      <div>Width: {width ?? "not measured yet"}</div>
    </>
  );
}

export default Example;
```
