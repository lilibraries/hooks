# useThrottle

Use a throttled callback.

## API

```ts
function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  options?: number | { wait?: number; leading?: boolean; trailing?: boolean },
): [
  throttledCallback: (...args: Parameters<T>) => ReturnType<T> | undefined,
  actions: {
    flush: () => ReturnType<T> | undefined;
    cancel: () => void;
  },
];
```

Parameters:

- **`callback`:** Original callback function.
- **`options`:** Throttle wait time or an options object.
  - **`options.wait`:** Throttle wait time, in milliseconds. Default is `0`.
  - **`options.leading`:** Run callback on the leading edge. Default is `false`.
  - **`options.trailing`:** Run callback on the trailing edge. Default is `true`.

Results:

- **`throttledCallback`:** Throttled callback.
- **`actions`:** Actions object.
  - **`actions.flush`:** Flush function. Run callback immediately.
  - **`actions.cancel`:** Cancel throttle timer.

## Notes

- The pending trailing invocation is cancelled on unmount — it never runs.
- With the default `leading: false`, the first call is delayed until the wait elapses.
- Changing the options mid-flight immediately flushes the pending invocation of the old throttled function.
- The returned function returns `undefined` when the invocation is deferred.

## Example

The following example shows how many times the callback actually runs after clicking the button rapidly.

```tsx
import { useRef, useState } from "react";
import { useThrottle } from "@lilib/hooks";

function Example() {
  const callsRef = useRef(0);
  const [runs, setRuns] = useState(0);

  const [throttledCall] = useThrottle(
    () => {
      callsRef.current++;
      setRuns(callsRef.current);
    },
    { wait: 500 },
  );

  return (
    <>
      <div>
        <button onClick={() => throttledCall()}>Throttled call</button>
      </div>
      <div>Callback actually runs: {runs}</div>
    </>
  );
}

export default Example;
```
