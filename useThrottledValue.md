# useThrottledValue

Throttle a value.

## API

```ts
function useThrottledValue<T>(
  value: T,
  options?: number | { wait?: number; leading?: boolean; trailing?: boolean },
): [
  throttledValue: T,
  actions: {
    flush: (finalValue?: T) => void;
    cancel: () => void;
  },
];
```

Parameters:

- **`value`:** The value to throttle.
- **`options`:** Throttle wait time or an options object.
  - **`options.wait`:** Throttle wait time, in milliseconds. Default is `0`.
  - **`options.leading`:** Change throttled value on the leading edge. Default is `false`.
  - **`options.trailing`:** Change throttled value on the trailing edge. Default is `true`.

Results:

- **`throttledValue`:** Throttled value.
- **`actions`:** Actions object.
  - **`actions.flush`:** Flush function. The `finalValue` will be returned as `throttledValue` if it is specified.
  - **`actions.cancel`:** Cancel throttle timer.

## Notes

- The initial render returns `value` immediately; only subsequent changes are throttled.
- With the default `leading: false`, updates land on the trailing edge only.
- The pending update is cancelled on unmount.

## Example

The following example shows a search box; requests are only sent when the throttled value changes.

```tsx
import { useState } from "react";
import { useThrottledValue, useUpdate } from "@lilib/hooks";

function Example() {
  const [value, setValue] = useState("");
  const [throttledValue] = useThrottledValue(value, 500);
  const [requests, setRequests] = useState(0);

  // Simulate a search request whenever the throttled value changes.
  useUpdate(() => {
    setRequests((requests) => requests + 1);
  }, [throttledValue]);

  return (
    <>
      <p>
        Enter search keywords:{" "}
        <input
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
      </p>
      <div>Throttled keywords: {throttledValue || "—"}</div>
      <div>Search requests sent: {requests}</div>
    </>
  );
}

export default Example;
```
