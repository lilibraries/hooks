import React, { useRef } from "react";
import { useElementSize } from "@lilib/hooks";

function Example() {
  const ref = useRef(null);
  const { width = 0, height = 0 } = useElementSize(ref);

  return (
    <div
      ref={ref}
      style={{
        padding: 16,
        border: "1px solid rgba(128, 128, 128, 0.25)",
      }}
    >
      Element size: {JSON.stringify({ width, height })}
    </div>
  );
}

export default Example;
