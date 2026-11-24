# useFullscreen

Control fullscreen for the page or a single element. The state and actions stay scoped to `target`: when another element is fullscreen, `fullscreen` stays `false` and `exit` leaves that session alone.

## API

```ts
function useFullscreen(target?: Element | React.RefObject<Element | null> | null): [
  fullscreen: boolean,
  actions: {
    enter: () => Promise<boolean>;
    exit: () => Promise<boolean>;
    toggle: () => Promise<boolean>;
  },
];
```

Parameters:

- **`target`:** The element (or its ref) to track and control. Defaults to `document.documentElement` (the whole page); pass `null` to track nothing. A ref is read when an action runs, so an element assigned after the first render is handled on the next call.

Results:

- **`fullscreen`:** Whether the target is the current fullscreen element. It follows changes made outside the hook, such as the user pressing `Esc`.
- **`actions`:** Actions object with a stable identity.
  - **`actions.enter`:** Enter fullscreen; resolves with whether the browser accepted the request.
  - **`actions.exit`:** Exit fullscreen when the target is the fullscreen element; resolves `false` when there is no target, otherwise with whether the target is not fullscreen afterwards.
  - **`actions.toggle`:** Enter or exit depending on the current state; resolves like the action it performed.

## Notes

- A rejected request, for example one made outside a user interaction, resolves `false` instead of throwing.
- Unmounting does not exit fullscreen.

## Example

The button toggles fullscreen for the panel it sits in; pressing `Esc` also exits.

```tsx
import { useRef } from "react";
import { useFullscreen } from "@lilib/hooks";

function Example() {
  const ref = useRef<HTMLDivElement>(null);
  const [fullscreen, { toggle }] = useFullscreen(ref);

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: 200,
        padding: 24,
        boxSizing: "border-box",
        color: "#1b1b1d",
        backgroundColor: "#f5f6f7",
        border: fullscreen ? "none" : "1px solid rgba(128, 128, 128, 0.25)",
        borderRadius: fullscreen ? 0 : 8,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <p style={{ margin: "0 0 16px" }}>
          {fullscreen ? "The panel fills the screen." : "The panel is inline."}
        </p>
        <button onClick={() => toggle()}>
          {fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        </button>
      </div>
    </div>
  );
}

export default Example;
```
