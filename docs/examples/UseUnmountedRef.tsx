import { useState } from "react";
import { useUnmountedRef } from "@lilib/hooks";

// Simulate a slow request that resolves after one second.
function fakeRequest(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Fake data"), 1000);
  });
}

function Loader({ onSkipped }: { onSkipped: () => void }) {
  const unmountedRef = useUnmountedRef();
  const [result, setResult] = useState("Not loaded");

  async function handleLoad() {
    setResult("Loading...");
    const data = await fakeRequest();
    if (unmountedRef.current) {
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
        <button onClick={() => setShow((show) => !show)}>{show ? "Unmount" : "Mount"} loader</button>
      </div>
      {show && <Loader onSkipped={() => setSkipped((skipped) => skipped + 1)} />}
      <div>Updates skipped after unmount: {skipped}</div>
    </>
  );
}

export default Example;
