import React, { useRef } from "react";
import { useSize } from "@lilib/hooks";

function Example() {
  const ref = useRef(null);
  const { width, height } = useSize(ref);

  return (
    <div
      ref={ref}
      style={{
        padding: 16,
        border: "1px solid rgba(128, 128, 128, 0.25)",
      }}
    >
      Width: {width} Height: {height}
    </div>
  );
}

export default Example;
