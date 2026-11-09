# useTimeout

Execute a callback after a delay.

## API

```ts
function useTimeout(
  callback: () => void,
  timeout?: number,
): [start: () => void, cancel: () => void];
```

Parameters:

- **`callback`:** The callback to execute after the delay.
- **`timeout`:** Optional delay time, in milliseconds.

Results:

- **`start`:** Starts the timer. It clears any previous timer first.
- **`cancel`:** Cancels the timer.

## Notes

- The timer starts only when `start` is called.
- Calling `start` again resets the timer.
- The timer is cancelled on unmount.

## Example

The following example shows a toast message that disappears automatically after a delay.

```tsx
import { useState } from "react";
import { useTimeout } from "@lilib/hooks";

function Example() {
  const [show, setShow] = useState(false);
  const [start, cancel] = useTimeout(() => {
    setShow(false);
  }, 1500);

  function handleShow() {
    setShow(true);
    start();
  }

  function handleCancel() {
    cancel();
    setShow(false);
  }

  return (
    <>
      <div>
        <button onClick={handleShow}>Show toast</button>{" "}
        <button onClick={handleCancel}>Cancel</button>
      </div>
      {show && (
        <div style={{ padding: 8, marginTop: 8, backgroundColor: "rgba(255, 165, 0, 0.3)" }}>
          A toast message
        </div>
      )}
    </>
  );
}

export default Example;
```
