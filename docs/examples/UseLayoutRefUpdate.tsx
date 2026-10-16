import { useRef, useState } from "react";
import { useLayoutRefUpdate } from "@lilib/hooks";

function Example() {
  const [long, setLong] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();

  useLayoutRefUpdate(() => {
    // Re-runs when the element that `domRef` points to changes,
    // measured synchronously before the browser paints.
    if (domRef.current) {
      setHeight(domRef.current.offsetHeight);
    }
  }, [domRef, long]);

  return (
    <>
      <div>
        <button onClick={() => setLong((long) => !long)}>Toggle content</button>
      </div>
      <div ref={domRef} style={{ padding: 16, backgroundColor: "rgba(255, 165, 0, 0.3)" }}>
        {long ? "A much longer piece of content" : "Short"}
      </div>
      <div>Measured height: {height ?? "—"}px</div>
    </>
  );
}

export default Example;
