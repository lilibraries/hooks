# useUpdate

Run an effect after the component updates or the dependencies change (the initial mount is skipped).

## API

```ts
function useUpdate(effect: React.EffectCallback, deps?: React.DependencyList): void;
```

Parameters:

- **`effect`:** The effect to run after an update. It may return a cleanup function.
- **`deps`:** The dependency array. If omitted, the effect runs after every render; an empty array means the effect never runs.

## Example

The following example shows that the effect runs after updates and skips the initial mount.

```tsx
import { useState } from "react";
import { useUpdate } from "@lilib/hooks";

function Example() {
  const [value, setValue] = useState(0);
  const [runs, setRuns] = useState(0);

  useUpdate(() => {
    setRuns((runs) => runs + 1);
  }, [value]);

  return (
    <>
      <button onClick={() => setValue((value) => value + 1)}>Change value</button>
      <div>Value: {value}</div>
      <div>Effect ran: {runs} time(s)</div>
    </>
  );
}

export default Example;
```
