import { useRef, type CSSProperties } from "react";
import { useHover } from "@lilib/hooks";

const boxStyle: CSSProperties = {
  padding: 24,
  border: "1px solid currentColor",
  textAlign: "center",
};

function Example() {
  const firstRef = useRef(null);
  const secondRef = useRef(null);

  const hovered = useHover([firstRef, secondRef], {
    enterDelay: 100,
    leaveDelay: 300,
  });

  const style = {
    ...boxStyle,
    backgroundColor: hovered ? "rgba(255, 165, 0, 0.3)" : "transparent",
  };

  return (
    <div>
      <div ref={firstRef} style={style}>
        First target
      </div>
      <div style={{ height: 16 }} />
      <div ref={secondRef} style={style}>
        Second target
      </div>
      <p>{hovered ? "Hovered" : "Not hovered"}</p>
    </div>
  );
}

export default Example;
