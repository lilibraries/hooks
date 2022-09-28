import React, { useState } from "react";
import { useInterval } from "@lilib/hooks";

function Example() {
  const [count, setCount] = useState(0);
  const [start, cancel] = useInterval(() => {
    setCount((count) => ++count);
  }, 1000);

  return (
    <>
      <button onClick={start}>Start</button>{" "}
      <button onClick={cancel}>Cancel</button> Count: {count}
    </>
  );
}

export default Example;
