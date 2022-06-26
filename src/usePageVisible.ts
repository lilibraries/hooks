import { useState } from "react";
import useEventListener from "./useEventListener";
import isBrowser from "./utils/isBrowser";

function usePageVisible() {
  const [visible, setVisible] = useState(() => {
    if (isBrowser) {
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
