# useLayoutUpdate

It's similar to [`useUpdate`](useUpdate.md), but it runs synchronously before the browser paints. It uses [`useIsomorphicLayoutEffect`](useIsomorphicLayoutEffect.md) internally.

## API

```ts
function useLayoutUpdate(effect: React.EffectCallback, deps?: React.DependencyList): void;
```

Parameters:

- **`effect`:** The effect to run after an update. It may return a cleanup function.
- **`deps`:** The dependency array. If omitted, the effect runs after every render; an empty array means the effect never runs.

## Example

The following example measures the width after the content changes, before the browser paints.

```tsx
import { useRef, useState } from "react";
import { useLayoutUpdate } from "@lilib/hooks";

function Example() {
  const [long, setLong] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>();

  useLayoutUpdate(() => {
    // Read the DOM size synchronously before the browser paints to avoid flicker.
    if (domRef.current) {
      setWidth(domRef.current.offsetWidth);
    }
  }, [long]);

  return (
    <>
      <div>
        <button onClick={() => setLong((long) => !long)}>Toggle content</button>
      </div>
      <div ref={domRef} style={{ padding: 16, backgroundColor: "rgba(255, 165, 0, 0.3)" }}>
        {long ? "A much longer piece of content" : "Short"}
      </div>
      <div>Measured width: {width ?? "—"}px</div>
    </>
  );
}

export default Example;
```
