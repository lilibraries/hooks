# useIsomorphicLayoutEffect

In the DOM environment, this hook is the same as `React.useLayoutEffect`. In the SSR environment, it is the same as `React.useEffect`.

## API

```ts
function useIsomorphicLayoutEffect(effect: React.EffectCallback, deps?: React.DependencyList): void;
```

## Notes

- During SSR it falls back to `useEffect`: the effect runs after hydration instead of before paint, which can cause a flash of unstyled or mismeasured content. Keep the effect idempotent across both phases.

## Example

The following example measures the element height; the same code runs safely during SSR.

```tsx
import { useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "@lilib/hooks";

function Example() {
  const domRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();

  useIsomorphicLayoutEffect(() => {
    if (domRef.current) {
      setHeight(domRef.current.offsetHeight);
    }
  }, []);

  return (
    <>
      <div ref={domRef} style={{ padding: 16, backgroundColor: "rgba(255, 165, 0, 0.3)" }}>
        Measured element
      </div>
      <div>Measured height: {height ?? "—"}px</div>
    </>
  );
}

export default Example;
```
