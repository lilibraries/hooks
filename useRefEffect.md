# useRefEffect

This hook is similar to [`React.useEffect`](https://react.dev/reference/react/useEffect), but ReactRefs in the dependency array are dereferenced to `ref.current` before comparison. The effect re-runs when the value a ref points to changes (such as a DOM node), which makes it useful when a DOM node itself is an effect dependency.

## API

```ts
function useRefEffect(effect: React.EffectCallback, deps?: React.DependencyList): void;
```

Parameters:

- **`effect`:** The effect function. It may return a cleanup function.
- **`deps`:** The dependency array. Its elements can be plain values or ReactRefs. If omitted, the effect re-runs after every update.

## Notes

- Plain objects with a `current` property are treated as ReactRefs and dereferenced, so they cannot be used as dependency values directly.

## Example

The following example binds hover listeners as soon as the DOM node is attached.

```tsx
import { useRef, useState } from "react";
import { useRefEffect } from "@lilib/hooks";

function Example() {
  const domRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useRefEffect(() => {
    const element = domRef.current;
    if (!element) {
      return;
    }
    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);
    element.addEventListener("mouseenter", onEnter);
    element.addEventListener("mouseleave", onLeave);
    return () => {
      element.removeEventListener("mouseenter", onEnter);
      element.removeEventListener("mouseleave", onLeave);
    };
  }, [domRef]);

  return (
    <div
      ref={domRef}
      style={{
        padding: 16,
        textAlign: "center",
        border: "1px solid rgba(128, 128, 128, 0.25)",
        backgroundColor: hovering ? "rgba(255, 165, 0, 0.3)" : "transparent",
      }}
    >
      {hovering ? "Mouse is inside" : "Hover me"}
    </div>
  );
}

export default Example;
```
