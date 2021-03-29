import { useState } from "react";
import useEventListener from "./useEventListener";

function useWindowSize() {
  const [{ width, height }, setState] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  function listener() {
    setState({ width: window.innerWidth, height: window.innerHeight });
  }

  useEventListener(window, "resize", listener);
  useEventListener(window, "orientationchange", listener);

  return { width, height } as const;
}

export default typeof window !== "undefined"
  ? useWindowSize
  : () => ({ width: 0, height: 0 });
