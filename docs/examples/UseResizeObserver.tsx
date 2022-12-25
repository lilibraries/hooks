import React, { useRef, useState } from "react";
import { useResizeObserver } from "@lilib/hooks";

function Example() {
  const [count, setCount] = useState(0);
  const containerRef = useRef(null);

  useResizeObserver(containerRef, () => {
    setCount((count) => ++count);
  });

  return <div ref={containerRef}>Container size change times: {count}</div>;
}

export default Example;
