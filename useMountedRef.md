# useMountedRef

It returns a ref object that is used to determine whether the component is mounted.

## API

```ts
function useMountedRef(): React.MutableRefObject<boolean>;
```

## Notes

- The flag is set by `useEffect`: during the first render and inside `useLayoutEffect`, `current` is still `false`.
- In StrictMode, the cleanup resets the flag during the simulated unmount.

## Example

The following example loads fake data asynchronously; click Load and unmount the loader before it finishes to see the update being skipped.

```tsx
import { useState } from "react";
import { useMountedRef } from "@lilib/hooks";

// Simulate a slow request that resolves after one second.
function fakeRequest(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Fake data"), 1000);
  });
}

function Loader({ onSkipped }: { onSkipped: () => void }) {
  const mountedRef = useMountedRef();
  const [result, setResult] = useState("Not loaded");

  async function handleLoad() {
    setResult("Loading...");
    const data = await fakeRequest();
    if (!mountedRef.current) {
      // The component unmounted while loading, skip the state update.
      onSkipped();
      return;
    }
    setResult(data);
  }

  return (
    <div>
      <button onClick={handleLoad}>Load</button> {result}
    </div>
  );
}

function Example() {
  const [show, setShow] = useState(true);
  const [skipped, setSkipped] = useState(0);

  return (
    <>
      <div>
        <button onClick={() => setShow((show) => !show)}>
          {show ? "Unmount" : "Mount"} loader
        </button>
      </div>
      {show && <Loader onSkipped={() => setSkipped((skipped) => skipped + 1)} />}
      <div>Updates skipped after unmount: {skipped}</div>
    </>
  );
}

export default Example;
```
