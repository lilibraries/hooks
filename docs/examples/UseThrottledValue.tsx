import React, { useState } from "react";
import { useThrottledValue } from "@lilib/hooks";

function Example() {
  const [value, setValue] = useState("");
  const [throttledValue] = useThrottledValue(value, 500);

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
