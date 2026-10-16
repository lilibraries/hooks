import { useState } from "react";
import { useDebouncedValue, useUpdate } from "@lilib/hooks";

function Example() {
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebouncedValue(value, 500);
  const [requests, setRequests] = useState(0);

  // Simulate a search request whenever the debounced value changes.
  useUpdate(() => {
    setRequests((requests) => requests + 1);
  }, [debouncedValue]);

  return (
    <>
      <p>
        Enter search keywords:{" "}
        <input
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
      </p>
      <div>Debounced keywords: {debouncedValue || "—"}</div>
      <div>Search requests sent: {requests}</div>
    </>
  );
}

export default Example;
