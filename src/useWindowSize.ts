import { useDebugValue, useRef, useState } from "react";

import useEventListener from "./useEventListener";
import inBrowser from "./utils/inBrowser";

/**
 * Get the window size.
 *
 * @returns Returns a `{ width, height }` object; both are `undefined` outside the browser.
 */
function useWindowSize() {
  const [{ width, height }, setState] = useState(() => {
    if (inBrowser) {
      return { width: window.innerWidth, height: window.innerHeight };
    } else {
      return { width: undefined, height: undefined };
    }
  });
  const windowRef = useRef<Window | null>(inBrowser ? window : null);
  const viewportRef = useRef<VisualViewport | null>(inBrowser ? window.visualViewport : null);

  function listener() {
    setState({ width: window.innerWidth, height: window.innerHeight });
  }

  useEventListener(windowRef, "resize", listener);
  useEventListener(windowRef, "orientationchange", listener);
  // On mobile, collapsing/expanding the address bar changes the visualViewport size without firing a window resize.
  useEventListener(viewportRef, "resize", listener);

  useDebugValue({ width, height });

  return { width, height } as const;
}

export default useWindowSize;
