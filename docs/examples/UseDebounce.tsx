import { useRef, useState } from "react";
import { useDebounce } from "@lilib/hooks";

function Example() {
  const callsRef = useRef(0);
  const [runs, setRuns] = useState(0);

  const [debouncedCall] = useDebounce(
    () => {
      callsRef.current++;
      setRuns(callsRef.current);
    },
    { wait: 500 },
  );

  return (
    <>
      <div>
        <button onClick={() => debouncedCall()}>Debounced call</button>
      </div>
      <div>Callback actually runs: {runs}</div>
    </>
  );
}

export default Example;
