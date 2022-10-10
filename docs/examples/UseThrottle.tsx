import React, { useState } from "react";
import { useThrottle, useUpdate } from "@lilib/hooks";

function Example() {
  const [value, setValue] = useState("");
  const [throttledValue, setThrottledValue] = useState("");
  const [updateThrottledValue] = useThrottle(setThrottledValue, { wait: 500 });

  useUpdate(() => {
    updateThrottledValue(value);
  }, [value]);

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
      <div>Throttled value: {throttledValue}</div>
    </>
  );
}

export default Example;
