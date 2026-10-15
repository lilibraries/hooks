import type { RefObject } from "react";

import ResizeObserver from "resize-observer-polyfill";

import useLayoutRefEffect from "./useLayoutRefEffect";
import usePersist from "./usePersist";
import unref from "./utils/unref";

/**
 * Watch an element's size changes.
 *
 * @param target The observed target or its ref.
 * @param listener The listener invoked on size changes.
 */
function useResizeObserver(
  target: Element | RefObject<Element | null>,
  listener: (entries: ResizeObserverEntry[]) => void,
) {
  const handler = usePersist(listener);

  useLayoutRefEffect(() => {
    const element = unref(target);
    if (!element) {
      return;
    }
    const observer = new ResizeObserver(handler);
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [target]);
}

export default useResizeObserver;
