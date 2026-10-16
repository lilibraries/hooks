import { useDebugValue, type RefObject } from "react";

import useResizeObserver from "./useResizeObserver";
import useSafeState from "./useSafeState";
import useUpdate from "./useUpdate";
import unref from "./utils/unref";

/**
 * Get the size of a DOM element.
 *
 * @param target The target element or its ref.
 * @returns Returns a `{ width, height }` object; both are `undefined` when the target is invalid.
 */
function useElementSize(target: Element | RefObject<Element | null>) {
  const [{ width, height }, setSize] = useSafeState(() => {
    const element = unref(target);
    if (element) {
      const rect = element.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    } else {
      return { width: undefined, height: undefined };
    }
  });

  useResizeObserver(target, (entries: ResizeObserverEntry[]) => {
    if (entries[0]) {
      const rect = entries[0].target.getBoundingClientRect();
      if (rect.width !== width || rect.height !== height) {
        setSize({ width: rect.width, height: rect.height });
      }
    }
  });

  // Reset the size when the target element becomes invalid to avoid stale values;
  // the dep is the element dereferenced during render, so this effect fires both
  // when the target is rebound and when it unmounts (unref yields null).
  useUpdate(() => {
    if (!unref(target)) {
      setSize({ width: undefined, height: undefined });
    }
  }, [unref(target)]);

  useDebugValue({ width, height });

  return { width, height } as const;
}

export default useElementSize;
