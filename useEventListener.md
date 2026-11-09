# useEventListener

Set up an event listener on the target.

## API

```ts
function useEventListener<T extends EventTarget = EventTarget, E extends Event = Event>(
  target: T | React.RefObject<T | null>,
  eventName: string,
  listener: (event: E) => void,
  options?: boolean | { capture?: boolean; once?: boolean; passive?: boolean },
): void;
```

Parameters:

- **`target`:** An event target, or a ref object that references an event target (or `null`).
- **`eventName`:** Event name.
- **`listener`:** Listener function.
- **`options`:** Similar to the third parameter of the [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) function, but only the `capture`, `once` and `passive` options are used.

## Notes

- When `target` is a ref, the listener is attached when the referenced node appears and re-attached when it changes; nothing happens while it is `null`.
- The `listener` is always the latest render's function, so it never reads stale closures.

## Example

The following example counts clicks on a button.

```tsx
import { useRef, useState } from "react";
import { useEventListener } from "@lilib/hooks";

function Example() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [count, setCount] = useState(0);

  useEventListener(buttonRef, "click", () => {
    setCount((count) => count + 1);
  });

  return (
    <>
      <button ref={buttonRef}>Click</button> Count: {count}
    </>
  );
}

export default Example;
```
