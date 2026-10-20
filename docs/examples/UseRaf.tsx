import { useRef, useState } from "react";
import { useRaf } from "@lilib/hooks";

function Example() {
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef(0);
  const loopRef = useRef<() => void>(() => {});

  const [start, cancel] = useRaf(() => {
    if (!startTimeRef.current) {
      startTimeRef.current = Date.now();
    }
    const elapsed = Date.now() - startTimeRef.current;
    setProgress(Math.min(elapsed / 2000, 1));
    if (elapsed < 2000) {
      // Re-schedule until the animation completes.
      loopRef.current();
    }
  });

  loopRef.current = start;

  function handleStart() {
    startTimeRef.current = 0;
    setProgress(0);
    start();
  }

  return (
    <>
      <div>
        <button onClick={handleStart}>Start</button> <button onClick={cancel}>Cancel</button>
      </div>
      <div style={{ height: 8, marginTop: 8, backgroundColor: "rgba(128, 128, 128, 0.2)" }}>
        <div
          style={{ width: progress * 100 + "%", height: "100%", backgroundColor: "orange" }}
        ></div>
      </div>
    </>
  );
}

export default Example;
