import { useRef } from "react";
import { useFullscreen } from "@lilib/hooks";

function Example() {
  const ref = useRef<HTMLDivElement>(null);
  const [fullscreen, { toggle }] = useFullscreen(ref);

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: 200,
        padding: 24,
        boxSizing: "border-box",
        color: "#1b1b1d",
        backgroundColor: "#f5f6f7",
        border: fullscreen ? "none" : "1px solid rgba(128, 128, 128, 0.25)",
        borderRadius: fullscreen ? 0 : 8,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <p style={{ margin: "0 0 16px" }}>
          {fullscreen ? "The panel fills the screen." : "The panel is inline."}
        </p>
        <button onClick={() => toggle()}>
          {fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        </button>
      </div>
    </div>
  );
}

export default Example;
