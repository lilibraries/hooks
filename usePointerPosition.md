# usePointerPosition

Track the position of the pointer in viewport coordinates.

## API

```ts
function usePointerPosition(options?: {
  enabled?: boolean;
}): { x: number; y: number; pointerType: string } | undefined;
```

Parameters:

- **`options`:** Options object.
  - **`options.enabled`:** Whether to track the pointer. Defaults to `true`.

Results:

- **`x`:** Horizontal position in CSS pixels, relative to the viewport's left edge.
- **`y`:** Vertical position in CSS pixels, relative to the viewport's top edge.
- **`pointerType`:** The kind of pointer: `"mouse"`, `"pen"`, `"touch"`, or `""` when the browser cannot detect it.

## Notes

- Coordinates are viewport coordinates, so they stay correct while the page scrolls; subtract the element's `getBoundingClientRect()` for element-relative coordinates.
- `pointerdown` is tracked as well, so a tap reports its contact position; on touch screens the position updates only while the finger is in contact.
- Updates are coalesced with `requestAnimationFrame`.
- While `enabled` is `false` the listeners are detached and the last position is kept.

## Example

The text shows the position of the pointer.

```tsx
import { usePointerPosition } from "@lilib/hooks";

function Example() {
  const position = usePointerPosition();

  return (
    <div>
      {position ? `x: ${Math.round(position.x)}, y: ${Math.round(position.y)}` : "Move the pointer"}
    </div>
  );
}

export default Example;
```
