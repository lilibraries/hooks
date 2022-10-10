import React, { useState } from "react";
import { useDebounce, useUpdate } from "@lilib/hooks";

function Example() {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [updateDebouncedValue] = useDebounce(setDebouncedValue, { wait: 500 });

  useUpdate(() => {
    updateDebouncedValue(value);
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
      <div>Debounced value: {debouncedValue}</div>
    </>
  );
}

export default Example;
