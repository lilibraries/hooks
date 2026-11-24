# useFocusWithin

Trigger a callback when the focus moves into or out of the target area. It is the JavaScript counterpart of CSS [`:focus-within`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within).

## API

```ts
function useFocusWithin<E extends FocusEvent = FocusEvent>(
  target: Node | React.RefObject<Node | null> | (Node | React.RefObject<Node | null>)[],
  listener: (isFocusWithin: boolean, event: E) => void,
): void;
```

Parameters:

- **`target`:** The target area: a single element or element ref, or an array of them. A target that has focus itself counts as within.
- **`listener`:** The callback invoked with whether the focus is within the target area, and the `focusin` or `focusout` event that reports the crossing.

## Notes

- The callback fires only when the focus crosses the boundary of the target area, so moving the focus between elements of the target area does not fire it.
- If the target has focus when the hook mounts, no callback fires, but the later "out" crossing is still reported.
- Focus inside a portal is not a DOM descendant of the target: pass the portal container in the `target` array to make it count as within.

## Example

The following example highlights a group of inputs while the focus is inside it.

```tsx
import type { CSSProperties } from "react";
import { useRef, useState } from "react";
import { useFocusWithin, useMount } from "@lilib/hooks";

const inputStyle: CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "6px 8px",
  fontSize: 13,
  color: "inherit",
  backgroundColor: "transparent",
  border: "1px solid rgba(128, 128, 128, 0.35)",
  borderRadius: 6,
};

function Example() {
  const groupRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const [isFocusWithin, setFocusWithin] = useState(false);

  useFocusWithin(groupRef, setFocusWithin);

  // Focus the first field on mount without scrolling the page to the example.
  useMount(() => {
    firstInputRef.current?.focus({ preventScroll: true });
  });

  return (
    <div>
      <div
        ref={groupRef}
        style={{
          display: "grid",
          gap: 8,
          maxWidth: 260,
          padding: 12,
          borderRadius: 10,
          border: `1px solid ${isFocusWithin ? "#25c2a0" : "rgba(128, 128, 128, 0.35)"}`,
          backgroundColor: isFocusWithin ? "rgba(37, 194, 160, 0.08)" : "transparent",
          transition: "border-color 120ms ease, background-color 120ms ease",
        }}
      >
        <input ref={firstInputRef} placeholder="First name" style={inputStyle} />
        <input placeholder="Last name" style={inputStyle} />
      </div>
      <div style={{ marginTop: 8, fontSize: 12, opacity: 0.7 }}>
        {isFocusWithin ? "Focus is within the group" : "Focus is outside the group"}
      </div>
    </div>
  );
}

export default Example;
```
