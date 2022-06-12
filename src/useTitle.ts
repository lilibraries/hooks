import { useRef } from "react";
import useUnmount from "./useUnmount";
import useMountedRef from "./useMountedRef";
import usePrevious from "./usePrevious";

function useTitle(title: string, options?: { restore?: boolean }) {
  const mountedRef = useMountedRef();
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
