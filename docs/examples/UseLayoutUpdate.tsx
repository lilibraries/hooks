import { useRef, useState } from "react";
import { useLayoutUpdate } from "@lilib/hooks";

function Example() {
  const [long, setLong] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>();

  useLayoutUpdate(() => {
    // Read the DOM size synchronously before the browser paints to avoid flicker.
    if (domRef.current) {
      setWidth(domRef.current.offsetWidth);
    }
  }, [long]);

  return (
    <>
      <div>
        <button onClick={() => setLong((long) => !long)}>Toggle content</button>
      </div>
      <div ref={domRef} style={{ padding: 16, backgroundColor: "rgba(255, 165, 0, 0.3)" }}>
        {long ? "A much longer piece of content" : "Short"}
      </div>
      <div>Measured width: {width ?? "—"}px</div>
    </>
  );
}

export default Example;
