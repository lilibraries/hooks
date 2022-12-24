import { useRef } from "react";
import { inBrowser } from "@lilib/utils";
import useUnmount from "./useUnmount";
import usePreviousRef from "./usePreviousRef";

export interface TitleHookOptions {
  restore?: boolean;
}

function useTitle(title: string | null, options?: TitleHookOptions) {
  const oldTitleRef = useRef(inBrowser ? document.title : "");
  const prevTitleRef = usePreviousRef(title);

  if (inBrowser && title != null && title !== prevTitleRef.current) {
    document.title = title;
  }

  useUnmount(() => {
    if (inBrowser && options && options.restore) {
      document.title = oldTitleRef.current;
    }
  });
}

export default useTitle;
