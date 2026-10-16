import { useState } from "react";
import { useThrottledValue, useUpdate } from "@lilib/hooks";

function Example() {
  const [value, setValue] = useState("");
  const [throttledValue] = useThrottledValue(value, 500);
  const [requests, setRequests] = useState(0);

  // Simulate a search request whenever the throttled value changes.
  useUpdate(() => {
    setRequests((requests) => requests + 1);
  }, [throttledValue]);

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
      <div>Throttled keywords: {throttledValue || "—"}</div>
      <div>Search requests sent: {requests}</div>
    </>
  );
}

export default Example;
