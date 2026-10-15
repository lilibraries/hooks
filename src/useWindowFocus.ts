import { useDebugValue, useRef } from "react";

import useEventListener from "./useEventListener";
import useSafeState from "./useSafeState";
import inBrowser from "./utils/inBrowser";

/**
 * Detect whether the `window` has focus. Always returns `false` in non-browser environments.
 *
 * @returns Returns `true` if the `window` has focus, otherwise `false`.
 */
function useWindowFocus() {
  const [focus, setFocus] = useSafeState(() => {
    if (inBrowser) {
      return document.hasFocus();
    } else {
      return false;
    }
  });

  const windowRef = useRef<Window | null>(inBrowser ? window : null);

  useEventListener(windowRef, "focus", () => {
    setFocus(true);
  });

  useEventListener(windowRef, "blur", () => {
    setFocus(false);
  });

  useDebugValue(focus);

  return focus;
}

export default useWindowFocus;
