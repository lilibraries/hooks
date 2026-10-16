import { useRef, useState } from "react";
import { useRefEffect } from "@lilib/hooks";

function Example() {
  const domRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useRefEffect(() => {
    const element = domRef.current;
    if (!element) {
      return;
    }
    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);
    element.addEventListener("mouseenter", onEnter);
    element.addEventListener("mouseleave", onLeave);
    return () => {
      element.removeEventListener("mouseenter", onEnter);
      element.removeEventListener("mouseleave", onLeave);
    };
  }, [domRef]);

  return (
    <div
      ref={domRef}
      style={{
        padding: 16,
        textAlign: "center",
        border: "1px solid rgba(128, 128, 128, 0.25)",
        backgroundColor: hovering ? "rgba(255, 165, 0, 0.3)" : "transparent",
      }}
    >
      {hovering ? "Mouse is inside" : "Hover me"}
    </div>
  );
}

export default Example;
