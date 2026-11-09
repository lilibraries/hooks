# useLayoutRefEffect

This hook is similar to [`useRefEffect`](useRefEffect.md), but it runs synchronously before the browser paints (layout phase), which suits cases that need immediate DOM reads or writes. It is built on [`useIsomorphicLayoutEffect`](useIsomorphicLayoutEffect.md) internally.

## API

```ts
function useLayoutRefEffect(effect: React.EffectCallback, deps?: React.DependencyList): void;
```

Parameters:

- **`effect`:** The effect function. It may return a cleanup function.
- **`deps`:** The dependency array. Its elements can be plain values or ReactRefs. If omitted, the effect re-runs after every update.

## Notes

- Plain objects with a `current` property are treated as ReactRefs and dereferenced, so they cannot be used as dependency values directly.

## Example

The following example measures the element size as soon as the DOM node is attached.

```tsx
import { useRef, useState } from "react";
import { useLayoutRefEffect } from "@lilib/hooks";

function Example() {
  const domRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ width: number; height: number }>();

  useLayoutRefEffect(() => {
    const element = domRef.current;
    if (!element) {
      return;
    }
    const measure = () => {
      setSize({ width: element.offsetWidth, height: element.offsetHeight });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
    };
  }, [domRef]);

  return (
    <>
      <div ref={domRef} style={{ padding: 16, backgroundColor: "rgba(255, 165, 0, 0.3)" }}>
        Measured element (resize the window)
      </div>
      <div>Measured size: {size ? `${size.width} x ${size.height}` : "—"}</div>
    </>
  );
}

export default Example;
```
