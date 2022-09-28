import React, { useState } from "react";
import { useTimeout } from "@lilib/hooks";

function Example() {
  const [count, setCount] = useState(0);
  const [increase, cancel] = useTimeout(() => {
    setCount((count) => ++count);
  }, 1000);

  return (
    <>
      <button onClick={increase}>+1 after one second</button>{" "}
      <button onClick={cancel}>Cancel</button> Count: {count}
    </>
  );
}

export default Example;
