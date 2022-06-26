import useSafeState from "./useSafeState";
import useEventListener from "./useEventListener";
import isBrowser from "./utils/isBrowser";

function useOnline() {
  const [online, setOnline] = useSafeState(() => {
    if (isBrowser) {
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
