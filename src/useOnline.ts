import useSafeState from "./useSafeState";
import useEventListener from "./useEventListener";
import inBrowser from "./utils/inBrowser";

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

  return online;
}

export default useOnline;
