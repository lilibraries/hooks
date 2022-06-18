import React, { useState } from "react";
import { useThrottle, useToggle, useUpdate } from "@lilib/hooks";

function random() {
  return Math.ceil(Math.random() * 5000);
}

function Example() {
  const [wait, setWait] = useState(random());
  const [leading, { toggle: toggleLeading }] = useToggle(false);
  const [trailing, { toggle: toggleTrailing }] = useToggle(true);

  const [value, setValue] = useState("");
  const [throttledValue, setThrottledValue] = useState("");
  const [throttledCallback, { flush, cancel }] = useThrottle(
    () => {
      setThrottledValue(value);
    },
    { wait, leading, trailing }
  );

  useUpdate(throttledCallback, [value]);

  return (
    <>
      <p>
        Actions:{" "}
        <button onClick={() => setWait(random())}>Change wait time</button>{" "}
        <button onClick={() => toggleLeading()}>Toggle leading</button>{" "}
        <button onClick={() => toggleTrailing()}>Toggle trailing</button>
      </p>
      <p>
        Options:{" "}
        {`{ wait: ${wait}, leading: ${leading}, trailing: ${trailing} }`}
      </p>
      <p>
        Enter value:{" "}
        <input
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />{" "}
        <button onClick={flush}>Flush</button>{" "}
        <button onClick={cancel}>Cancel</button>
      </p>
      <div>Throttled value: {throttledValue}</div>
    </>
  );
}

export default Example;
