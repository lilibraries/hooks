# useLayoutMount

It's similar to [`useMount`](useMount.md), but it runs synchronously before the browser paints. It uses [`useIsomorphicLayoutEffect`](useIsomorphicLayoutEffect.md) internally.

## API

```ts
function useLayoutMount(effect: React.EffectCallback): void;
```

Parameters:

- **`effect`:** The effect to run after the component mounts. It may return a cleanup function.

## Example

The following example measures the element width before the browser paints.

```tsx
import { useRef, useState } from "react";
import { useLayoutMount } from "@lilib/hooks";

function Example() {
  const domRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>();

  useLayoutMount(() => {
    // Runs before the browser paints, so the size is available in the first paint.
    if (domRef.current) {
      setWidth(domRef.current.offsetWidth);
    }
  });

  return (
    <>
      <div ref={domRef} style={{ padding: 16, backgroundColor: "rgba(255, 165, 0, 0.3)" }}>
        Measured element
      </div>
      <div>Measured width: {width ?? "—"}px</div>
    </>
  );
}

export default Example;
```
