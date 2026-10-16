import { useRef, useState } from "react";
import { useElementSize } from "@lilib/hooks";

function Example() {
  const [wide, setWide] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { width = 0, height = 0 } = useElementSize(ref);

  return (
    <>
      <div>
        <button onClick={() => setWide((wide) => !wide)}>Toggle size</button>
      </div>
      <div
        ref={ref}
        style={{
          padding: 16,
          width: wide ? "100%" : "50%",
          border: "1px solid rgba(128, 128, 128, 0.25)",
        }}
      >
        Element size: {JSON.stringify({ width, height })}
      </div>
    </>
  );
}

export default Example;
