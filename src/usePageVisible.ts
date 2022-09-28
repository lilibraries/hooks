import { useState } from "react";
import useEventListener from "./useEventListener";
import inBrowser from "./utils/inBrowser";

function usePageVisible() {
  const [visible, setVisible] = useState(() => {
    if (inBrowser) {
      return !document.hidden;
    } else {
      return true;
    }
  });

  useEventListener(
    () => document,
    "visibilitychange",
    () => {
      setVisible(!document.hidden);
    }
  );

  return visible;
}

export default usePageVisible;
