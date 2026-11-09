# usePersist

Return the same function identity regardless of how the `callback` argument changes. The returned function behaves exactly like `callback`. A typical use case: the callback must go into a dependency array (e.g. `useEffect`), yet calls should always use the latest logic.

## API

```ts
function usePersist<T extends (...args: any[]) => any>(
  callback: T,
): (...args: Parameters<T>) => ReturnType<T>;
```

Parameters:

- **`callback`:** The callback function.

## Example

The following example binds a document click listener only once, and it always reads the latest input value.

```tsx
import { useEffect, useState } from "react";
import { usePersist } from "@lilib/hooks";

function Example() {
  const [value, setValue] = useState("");
  const [lastSeen, setLastSeen] = useState("");

  // The callback identity never changes, so the listener is bound only once.
  const onClick = usePersist(() => {
    // Always reads the latest `value` (no stale closure).
    setLastSeen(value);
  });

  useEffect(() => {
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [onClick]);

  return (
    <>
      <p>
        Enter value:{" "}
        <input
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
      </p>
      <div>Last value read on click: {lastSeen || "—"}</div>
    </>
  );
}

export default Example;
```
