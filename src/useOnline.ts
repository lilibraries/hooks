import { useDebugValue } from "react";
import { inBrowser } from "@lilib/utils";
import useSafeState from "./useSafeState";
import useEventListener from "./useEventListener";

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

  useEventListener(() => window, "online", listener);
  useEventListener(() => window, "offline", listener);

  useDebugValue(online);

  return online;
}

export default useOnline;
