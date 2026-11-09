# useDebouncedValue

Debounce a value.

## API

```ts
function useDebouncedValue<T>(
  value: T,
  options?: number | { wait?: number; maxWait?: number; leading?: boolean; trailing?: boolean },
): [
  debouncedValue: T,
  actions: {
    flush: (finalValue?: T) => void;
    cancel: () => void;
  },
];
```

Parameters:

- **`value`:** The value to debounce.
- **`options`:** Debounce wait time or an options object.
  - **`options.wait`:** Debounce wait time, in milliseconds. Default is `0`.
  - **`options.maxWait`:** Max wait time, in milliseconds. Default is `Infinity`.
  - **`options.leading`:** Change debounced value on the leading edge. Default is `false`.
  - **`options.trailing`:** Change debounced value on the trailing edge. Default is `true`.

Results:

- **`debouncedValue`:** Debounced value.
- **`actions`:** Actions object.
  - **`actions.flush`:** Flush function. The `finalValue` will be returned as `debouncedValue` if it is specified.
  - **`actions.cancel`:** Cancel debounce timer.

## Notes

- The initial render returns `value` immediately; only subsequent changes are debounced.
- The pending update is cancelled on unmount.

## Example

The following example shows a search box; requests are only sent when the debounced value changes.

```tsx
import { useState } from "react";
import { useDebouncedValue, useUpdate } from "@lilib/hooks";

function Example() {
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebouncedValue(value, 500);
  const [requests, setRequests] = useState(0);

  // Simulate a search request whenever the debounced value changes.
  useUpdate(() => {
    setRequests((requests) => requests + 1);
  }, [debouncedValue]);

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
      <div>Debounced keywords: {debouncedValue || "—"}</div>
      <div>Search requests sent: {requests}</div>
    </>
  );
}

export default Example;
```
