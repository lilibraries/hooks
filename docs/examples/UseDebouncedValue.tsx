import React, { useState } from "react";
import { useDebouncedValue } from "@lilib/hooks";

function Example() {
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebouncedValue(value, 500);

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
      <div>Debounced value: {debouncedValue}</div>
    </>
  );
}

export default Example;
