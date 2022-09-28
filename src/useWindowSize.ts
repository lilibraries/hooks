import { useState } from "react";
import useEventListener from "./useEventListener";
import inBrowser from "./utils/inBrowser";

function useWindowSize() {
  const [{ width, height }, setState] = useState(() => {
    if (inBrowser) {
      return { width: window.innerWidth, height: window.innerHeight };
    } else {
      return { width: 0, height: 0 };
    }
  });

  function listener() {
    setState({ width: window.innerWidth, height: window.innerHeight });
  }

  useEventListener(() => window, "resize", listener);
  useEventListener(() => window, "orientationchange", listener);

  return { width, height } as const;
}

export default useWindowSize;
