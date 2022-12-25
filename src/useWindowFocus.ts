import { useDebugValue } from "react";
import { inBrowser } from "@lilib/utils";
import useSafeState from "./useSafeState";
import useEventListener from "./useEventListener";

function useWindowFocus() {
  const [focus, setFocus] = useSafeState(() => {
    if (inBrowser) {
      return document.hasFocus();
    } else {
      return false;
    }
  });

  useEventListener(
    () => window,
    "focus",
    () => {
      setFocus(true);
    }
  );

  useEventListener(
    () => window,
    "blur",
    () => {
      setFocus(false);
    }
  );

  useDebugValue(focus);

  return focus;
}

export default useWindowFocus;
