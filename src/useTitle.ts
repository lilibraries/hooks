import { useEffect, useRef } from "react";

import useUnmount from "./useUnmount";
import inBrowser from "./utils/inBrowser";

interface UseTitleOptions {
  restore?: boolean;
}

/**
 * Set the document title.
 *
 * @param title The document title; pass `null` to not set one.
 * @param options The options object.
 * @param options.restore Whether to restore the previous title on unmount.
 */
function useTitle(title: string | null, options?: UseTitleOptions) {
  const oldTitleRef = useRef("");
  // Capture the original title on the first render only, for restoration via the `restore` option
  const capturedRef = useRef(false);

  useEffect(() => {
    if (!inBrowser) {
      return;
    }
    if (!capturedRef.current) {
      capturedRef.current = true;
      oldTitleRef.current = document.title;
    }
    if (title != null) {
      document.title = title;
    }
  }, [title]);

  useUnmount(() => {
    if (inBrowser && options?.restore) {
      document.title = oldTitleRef.current;
    }
  });
}

export default useTitle;
