# useInterval

Run a callback repeatedly at a fixed interval.

## API

```ts
function useInterval(
  callback: () => void,
  interval?: number,
): [start: () => void, cancel: () => void];
```

Parameters:

- **`callback`:** A function to be called at intervals.
- **`interval`:** The interval, in milliseconds.

Results:

- **`start`:** Starts the loop. It clears any previous loop first.
- **`cancel`:** Cancels the loop.

## Notes

- The loop is cancelled on unmount.

## Example

The following example shows an elapsed-seconds clock that starts automatically on mount.

```tsx
import { useState } from "react";
import { useInterval, useMount } from "@lilib/hooks";

function Example() {
  const [elapsed, setElapsed] = useState(0);
  const [start, cancel] = useInterval(() => {
    setElapsed((elapsed) => elapsed + 1);
  }, 1000);

  // Start the clock automatically on mount.
  useMount(start);

  return (
    <>
      <div>
        <button onClick={cancel}>Pause</button> <button onClick={start}>Resume</button>
      </div>
      <div>Elapsed seconds: {elapsed}</div>
    </>
  );
}

export default Example;
```
