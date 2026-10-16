import { useRef, useState } from "react";
import { useLayoutRefEffect } from "@lilib/hooks";

function Example() {
  const domRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ width: number; height: number }>();

  useLayoutRefEffect(() => {
    const element = domRef.current;
    if (!element) {
      return;
    }
    const measure = () => {
      setSize({ width: element.offsetWidth, height: element.offsetHeight });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
    };
  }, [domRef]);

  return (
    <>
      <div ref={domRef} style={{ padding: 16, backgroundColor: "rgba(255, 165, 0, 0.3)" }}>
        Measured element (resize the window)
      </div>
      <div>Measured size: {size ? `${size.width} x ${size.height}` : "—"}</div>
    </>
  );
}

export default Example;
