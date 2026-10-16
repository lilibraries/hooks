import { useState } from "react";
import { usePreviousRef } from "@lilib/hooks";

function Example() {
  const [count, setCount] = useState(0);
  const previousRef = usePreviousRef(count);

  return (
    <>
      <button onClick={() => setCount((count) => count + 1)}>+1</button>
      <div>Current: {count}</div>
      <div>Previous: {previousRef.current ?? "—"}</div>
    </>
  );
}

export default Example;
