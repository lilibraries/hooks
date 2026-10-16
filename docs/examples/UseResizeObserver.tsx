import { useRef, useState } from "react";
import { useResizeObserver } from "@lilib/hooks";

function Example() {
  const [wide, setWide] = useState(false);
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useResizeObserver(containerRef, () => {
    setCount((count) => count + 1);
  });

  return (
    <>
      <div>
        <button onClick={() => setWide((wide) => !wide)}>Toggle size</button>
      </div>
      <div
        ref={containerRef}
        style={{ padding: 16, width: wide ? "100%" : "50%", backgroundColor: "rgba(255, 165, 0, 0.3)" }}
      >
        Resized times: {count}
      </div>
    </>
  );
}

export default Example;
