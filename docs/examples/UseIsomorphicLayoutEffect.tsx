import { useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "@lilib/hooks";

function Example() {
  const domRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();

  useIsomorphicLayoutEffect(() => {
    if (domRef.current) {
      setHeight(domRef.current.offsetHeight);
    }
  }, []);

  return (
    <>
      <div ref={domRef} style={{ padding: 16, backgroundColor: "rgba(255, 165, 0, 0.3)" }}>
        Measured element
      </div>
      <div>Measured height: {height ?? "—"}px</div>
    </>
  );
}

export default Example;
