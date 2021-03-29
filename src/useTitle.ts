import { useRef } from "react";
import useUnmount from "./useUnmount";
import useMounted from "./useMounted";
import usePrevious from "./usePrevious";

function useTitle(title: string, options?: { restore?: boolean }) {
  const mountedRef = useMounted();
  const oldTitleRef = useRef(document.title);
  const previousTitleRef = usePrevious(title);

  if (!mountedRef.current || previousTitleRef.current !== title) {
    document.title = title;
  }

  useUnmount(() => {
    if (options && options.restore) {
      document.title = oldTitleRef.current;
    }
  });
}

const useNoop: typeof useTitle = () => {};

export default typeof document !== "undefined" ? useTitle : useNoop;
