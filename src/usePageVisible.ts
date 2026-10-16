import { useDebugValue, useRef, useState } from "react";

import useEventListener from "./useEventListener";
import inBrowser from "./utils/inBrowser";
import isPageVisible from "./utils/isPageVisible";

/**
 * Detect whether the page is visible.
 *
 * @returns Returns `true` if the page is visible, otherwise `false`.
 */
function usePageVisible() {
  const [visible, setVisible] = useState(isPageVisible);

  const windowRef = useRef<Window | null>(inBrowser ? window : null);
  const documentRef = useRef<Document | null>(inBrowser ? document : null);

  useEventListener(documentRef, "visibilitychange", () => {
    setVisible(isPageVisible());
  });

  // `visibilitychange` does not fire when restoring from bfcache, so also listen to `pageshow` to re-detect.
  useEventListener(windowRef, "pageshow", () => {
    setVisible(isPageVisible());
  });

  useDebugValue(visible);

  return visible;
}

export default usePageVisible;
