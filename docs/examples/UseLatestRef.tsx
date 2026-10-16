import { useState } from "react";
import { useInterval, useLatestRef } from "@lilib/hooks";

function Example() {
  const [value, setValue] = useState("");
  const [snapshot, setSnapshot] = useState("");
  const valueRef = useLatestRef(value);

  const [start, cancel] = useInterval(() => {
    // The interval callback is bound once, but reads the latest value via the ref.
    setSnapshot(valueRef.current);
  }, 1000);

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
      <div>
        <button onClick={start}>Start</button> <button onClick={cancel}>Cancel</button>
      </div>
      <div>Interval snapshot: {snapshot || "—"}</div>
    </>
  );
}

export default Example;
