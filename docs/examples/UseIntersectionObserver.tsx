import React, { useRef, useState } from "react";
import { useIntersectionObserver } from "@lilib/hooks";

function Example() {
  const [intersecting, setIntersecting] = useState(false);
  const rootRef = useRef(null);
  const targetRef = useRef(null);

  useIntersectionObserver(
    targetRef,
    (entries) => {
      if (entries && entries[0] && entries[0].isIntersecting) {
        setIntersecting(true);
      } else {
        setIntersecting(false);
      }
    },
    { root: rootRef, threshold: 1 }
  );

  return (
    <div
      ref={rootRef}
      style={{
        height: 200,
        overflow: "auto",
      }}
    >
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
