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
    const width = window.innerWidth;
    const height = window.innerHeight;
    // Bail out when the size is unchanged: the visualViewport may fire resize
    // (e.g. on pinch-zoom) while the window size stays the same.
    setState((prevState) => (prevState.width === width && prevState.height === height ? prevState : { width, height }));
  }

  useEventListener(windowRef, "resize", listener);
  useEventListener(windowRef, "orientationchange", listener);
  // On mobile, collapsing/expanding the address bar can resize the layout
  // viewport without firing a window resize, so also listen to visualViewport.
  useEventListener(viewportRef, "resize", listener);

  useDebugValue({ width, height });

  return { width, height } as const;
}

export default useWindowSize;
