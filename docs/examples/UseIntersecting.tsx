import React, { useRef } from "react";
import { useIntersecting } from "@lilib/hooks";

function Example() {
  const rootRef = useRef(null);
  const targetRef = useRef(null);

  const intersecting = useIntersecting(targetRef, {
    root: rootRef,
    threshold: 1,
  });

  return (
    <div ref={rootRef} style={{ height: 200, overflow: "auto" }}>
      <div
        ref={targetRef}
        style={{
          height: 100,
          marginTop: 150,
          marginBottom: 150,
          backgroundColor: intersecting ? "orange" : "transparent",
        }}
      >
        {intersecting ? "Complete intersection" : "Incomplete intersection"}
      </div>
    </div>
  );
}

export default Example;
