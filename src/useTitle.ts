import { useRef } from "react";
import useUnmount from "./useUnmount";
import usePreviousRef from "./usePreviousRef";
import isBrowser from "./utils/isBrowser";

function useTitle(title: string, options?: { restore?: boolean }) {
  const oldTitleRef = useRef(isBrowser ? document.title : "");
  const prevTitleRef = usePreviousRef(title);

  if (isBrowser && title && title !== prevTitleRef.current) {
    document.title = title;
  }

  useUnmount(() => {
    if (isBrowser && options && options.restore) {
      document.title = oldTitleRef.current;
    }
  });
}

export default useTitle;
