import { useEffect, useState } from "react";
import { usePageVisible } from "@lilib/hooks";

function Example() {
  const visible = usePageVisible();
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!visible) {
      // Pause while the page is hidden.
      return;
    }
    const timer = setInterval(() => {
      setElapsed((elapsed) => elapsed + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [visible]);

  return (
    <div>
      <div>The page is {visible ? "visible" : "hidden"}.</div>
      <div>Elapsed seconds (pauses while hidden): {elapsed}</div>
    </div>
  );
}

export default Example;
