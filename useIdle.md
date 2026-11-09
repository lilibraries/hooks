# useIdle

Invoke the callback when the browser is idle. This hook uses [window.requestIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback) by default. If `window.requestIdleCallback` is unavailable, it falls back to `setTimeout`.

## API

```ts
function useIdle(
  callback: () => void,
  options?: IdleRequestOptions,
): [start: () => void, cancel: () => void];
```

Parameters:

- **`callback`:** The callback invoked when idle.
- **`options`:** The options passed to [window.requestIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback).

Results:

- **`start`:** Starts the idle callback.
- **`cancel`:** Cancels the idle callback.

## Notes

- Calling `start` again cancels the previous idle callback.
- The pending callback is cancelled on unmount.

## Example

The following example runs a low-priority task (e.g. analytics) when the browser is idle.

```tsx
import { useState } from "react";
import { useIdle } from "@lilib/hooks";

function Example() {
  const [logs, setLogs] = useState<string[]>([]);
  const [start, cancel] = useIdle(() => {
    setLogs((logs) => [...logs, `Idle task done at ${new Date().toLocaleTimeString()}`]);
  });

  return (
    <>
      <div>
        <button onClick={start}>Start idle task</button> <button onClick={cancel}>Cancel</button>
      </div>
      <ul style={{ margin: 0, paddingLeft: 24 }}>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </>
  );
}

export default Example;
```
