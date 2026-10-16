import { useRef, useState } from "react";
import { useLayoutMount } from "@lilib/hooks";

function Example() {
  const domRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>();

  useLayoutMount(() => {
    // Runs before the browser paints, so the size is available in the first paint.
    if (domRef.current) {
      setWidth(domRef.current.offsetWidth);
    }
  });

  return (
    <>
      <div ref={domRef} style={{ padding: 16, backgroundColor: "rgba(255, 165, 0, 0.3)" }}>
        Measured element
      </div>
      <div>Measured width: {width ?? "—"}px</div>
    </>
  );
}

export default Example;
