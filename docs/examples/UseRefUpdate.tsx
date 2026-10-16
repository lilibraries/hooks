import { useRef, useState } from "react";
import { useRefUpdate } from "@lilib/hooks";

function Example() {
  const [show, setShow] = useState(true);
  const domRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>();

  useRefUpdate(() => {
    // Re-runs whenever the element that `domRef` points to is (re)attached.
    if (domRef.current) {
      setWidth(domRef.current.offsetWidth);
    }
  }, [domRef]);

  return (
    <>
      <div>
        <button onClick={() => setShow((show) => !show)}>Toggle element</button>
      </div>
      {show && <div ref={domRef}>Measured element</div>}
      <div>Width: {width ?? "not measured yet"}</div>
    </>
  );
}

export default Example;
