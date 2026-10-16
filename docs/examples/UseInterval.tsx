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
