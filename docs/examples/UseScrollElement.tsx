import { useRef } from "react";
import { useScroll } from "@lilib/hooks";

function Example() {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y, directionX, directionY, progressX, progressY } = useScroll({ target: ref });

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
        <button onClick={() => ref.current?.scrollTo({ left: 0, top: 0, behavior: "smooth" })}>
          Reset
        </button>
        <button onClick={() => ref.current?.scrollBy({ left: 120, behavior: "smooth" })}>
          Scroll right
        </button>
        <button onClick={() => ref.current?.scrollBy({ top: 120, behavior: "smooth" })}>
          Scroll down
        </button>
      </div>
      <div
        ref={ref}
        style={{
          width: 320,
          height: 180,
          overflow: "auto",
          border: "1px solid rgba(128, 128, 128, 0.3)",
        }}
      >
        <div
          style={{
            width: 900,
            height: 600,
            padding: 16,
            background: "linear-gradient(135deg, rgba(255, 165, 0, 0.08), rgba(0, 128, 255, 0.08))",
          }}
        >
          Scroll this box horizontally and vertically.
        </div>
      </div>
      <div style={{ marginTop: 8, fontSize: 14 }}>
        x: {Math.round(x)}, y: {Math.round(y)}, directionX: {directionX || "none"}, directionY:{" "}
        {directionY || "none"}, progressX: {Math.round(progressX * 100)}%, progressY:{" "}
        {Math.round(progressY * 100)}%
      </div>
    </>
  );
}

export default Example;
