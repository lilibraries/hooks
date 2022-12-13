import { useDebugValue, useState } from "react";
import useEventListener from "./useEventListener";
import isPageVisible from "./utils/isPageVisible";

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
