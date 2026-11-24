# useHover

## API

```ts
function useHover(
  target: Element | React.RefObject<Element | null> | (Element | React.RefObject<Element | null>)[],
  options?: {
    enterDelay?: number;
    leaveDelay?: number;
  },
): boolean;
```

Parameters:

- **`target`:** The hovered element or its ref, or an array of them.
- **`options`:** Options object.
  - **`options.enterDelay`:** Delay in milliseconds before reporting `true` after the pointer enters. Defaults to `0`.
  - **`options.leaveDelay`:** Delay in milliseconds before reporting `false` after the pointer leaves. Defaults to `0`.

Results:

- A boolean indicating whether the pointer is over any of the targets.

## Notes

- All targets form one hover area: moving the pointer between them is not a leave, and with a `leaveDelay` even a gap between them can be crossed.
- A target that is replaced, unmounted, or removed from the document is treated as left.
- `mouseenter` and `mouseleave` do not fire for touch input, so tapping never reports a hover.
- Hover does not serve keyboard users; pair the hook with `useFocusWithin` when an overlay must also open on focus.

## Example

The leave delay covers the gap between the two targets.

```tsx
import { useRef, type CSSProperties } from "react";
import { useHover } from "@lilib/hooks";

const boxStyle: CSSProperties = {
  padding: 24,
  border: "1px solid currentColor",
  textAlign: "center",
};

function Example() {
  const firstRef = useRef(null);
  const secondRef = useRef(null);

  const hovered = useHover([firstRef, secondRef], {
    enterDelay: 100,
    leaveDelay: 300,
  });

  const style = {
    ...boxStyle,
    backgroundColor: hovered ? "rgba(255, 165, 0, 0.3)" : "transparent",
  };

  return (
    <div>
      <div ref={firstRef} style={style}>
        First target
      </div>
      <div style={{ height: 16 }} />
      <div ref={secondRef} style={style}>
        Second target
      </div>
      <p>{hovered ? "Hovered" : "Not hovered"}</p>
    </div>
  );
}

export default Example;
```
