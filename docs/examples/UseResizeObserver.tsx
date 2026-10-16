import { useRef, useState } from "react";
import { useResizeObserver } from "@lilib/hooks";

function Example() {
  const [count, setCount] = useState(0);
  const containerRef = useRef(null);

  useResizeObserver(containerRef, () => {
    setCount((count) => count + 1);
  });

  return <div ref={containerRef}>Resized times: {count}</div>;
}

export default Example;
