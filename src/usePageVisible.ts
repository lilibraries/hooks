import { useState } from "react";
import useEventListener from "./useEventListener";
import inBrowser from "./utils/inBrowser";

function isPageVisible() {
  return document.visibilityState === "visible";
}

function usePageVisible() {
  const [visible, setVisible] = useState(() => {
    if (inBrowser) {
      return isPageVisible();
    } else {
      return true;
    }
  });

  useEventListener(
    () => document,
    "visibilitychange",
    () => {
      setVisible(isPageVisible());
    }
  );

  return visible;
}

export default usePageVisible;
