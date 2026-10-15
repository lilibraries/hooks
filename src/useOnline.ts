import { useDebugValue, useRef } from "react";

import useEventListener from "./useEventListener";
import useSafeState from "./useSafeState";
import inBrowser from "./utils/inBrowser";

/**
 * Detect whether the network is online. Always returns `true` in non-browser environments.
 *
 * @returns Returns `true` if the network is online, otherwise `false`.
 */
function useOnline() {
  const [online, setOnline] = useSafeState(() => {
    if (inBrowser) {
      return window.navigator.onLine;
    } else {
      return true;
    }
  });

  const listener = () => {
    setOnline(window.navigator.onLine);
  };
  const windowRef = useRef<Window | null>(inBrowser ? window : null);

  useEventListener(windowRef, "online", listener);
  useEventListener(windowRef, "offline", listener);

  useDebugValue(online);

  return online;
}

export default useOnline;
