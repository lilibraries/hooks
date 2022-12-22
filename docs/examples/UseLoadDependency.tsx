import React, { useState } from "react";
import { useLoad } from "@lilib/hooks";

function Example() {
  const [count, setCount] = useState(0);

  const { data, loading } = useLoad(() => {
    return new Promise<number>((resolve) => {
      setTimeout(() => {
        resolve(count);
      }, 1000);
    });
  }, [count]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      Count: {loading ? "Loading..." : data}
    </div>
  );
}

export default Example;
