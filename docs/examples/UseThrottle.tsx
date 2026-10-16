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
