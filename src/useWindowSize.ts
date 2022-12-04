import { useDebugValue, useState } from "react";
import useEventListener from "./useEventListener";
import inBrowser from "./utils/inBrowser";

function useWindowSize() {
  const [{ width, height }, setState] = useState(() => {
    if (inBrowser) {
      return { width: window.innerWidth, height: window.innerHeight };
    } else {
      return { width: undefined, height: undefined };
    }
  });

  function listener() {
    setState({ width: window.innerWidth, height: window.innerHeight });
  }

  useEventListener(() => window, "resize", listener);
  useEventListener(() => window, "orientationchange", listener);

  useDebugValue({ width, height });

  return { width, height } as const;
}

export default useWindowSize;
