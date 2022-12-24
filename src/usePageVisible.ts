import { useDebugValue, useState } from "react";
import { isPageVisible } from "@lilib/utils";
import useEventListener from "./useEventListener";

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
