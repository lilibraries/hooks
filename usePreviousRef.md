# usePreviousRef

Return a ref object whose `.current` property points to the value from the previous update, and is kept while the value is unchanged. The first time is `undefined`.

## API

```ts
function usePreviousRef<T>(value: T): React.MutableRefObject<T | undefined>;
```

## Notes

- Comparison is by reference (`!==`): an object with a new identity counts as changed even if its content is equal. Use a deep-comparing hook such as `useMemoizedValue` when needed.

## Example

The following example shows the value of the previous render.

```tsx
import { useState } from "react";
import { usePreviousRef } from "@lilib/hooks";

function Example() {
  const [count, setCount] = useState(0);
  const previousRef = usePreviousRef(count);

  return (
    <>
      <button onClick={() => setCount((count) => count + 1)}>+1</button>
      <div>Current: {count}</div>
      <div>Previous: {previousRef.current ?? "—"}</div>
    </>
  );
}

export default Example;
```
