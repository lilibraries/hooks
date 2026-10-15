import { useDebugValue, type RefObject } from "react";

import useIntersectionObserver, { type UseIntersectionObserverOptions } from "./useIntersectionObserver";
import useSafeState from "./useSafeState";
import useUpdate from "./useUpdate";
import unref from "./utils/unref";

/**
 * Determine whether the target element intersects the viewport (or the specified `root`).
 *
 * @param target The observed target or its ref.
 * @param options The options object, see IntersectionObserver options.
 * @returns Returns a boolean indicating whether the target element is intersecting.
 */
function useIntersecting(target: Element | RefObject<Element | null>, options?: UseIntersectionObserverOptions) {
  const [intersecting, setIntersecting] = useSafeState(false);

  useIntersectionObserver(
    target,
    (entries) => {
      if (entries && entries[0] && entries[0].isIntersecting) {
        setIntersecting(true);
      } else {
        setIntersecting(false);
      }
    },
    options,
  );

  // Reset the intersecting state when the target element becomes invalid to avoid
  // stale values; the dep is the element dereferenced during render, so this
  // effect fires both when the target is rebound and when it unmounts (unref
  // yields null)
  useUpdate(() => {
    if (!unref(target)) {
      setIntersecting(false);
    }
  }, [unref(target)]);

  useDebugValue(intersecting);

  return intersecting;
}

export default useIntersecting;
