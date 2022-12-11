import { useDebugValue, useState } from "react";
import useEventListener from "./useEventListener";
import inBrowser from "./utils/inBrowser";

export function isPageVisible() {
  return inBrowser ? document.visibilityState === "visible" : true;
}

function usePageVisible() {
  const [visible, setVisible] = useState(isPageVisible);

  useEventListener(
    () => document,
    "visibilitychange",
    () => {
      setVisible(isPageVisible());
    }
  );

  useDebugValue(visible);

  return visible;
}

export default usePageVisible;
