import { useRef, type DependencyList, type EffectCallback } from "react";

import type { EffectHook } from "../utils/types";

/**
 * Factory for creating update-style hooks: takes an effect-style hook and
 * returns a hook that runs the effect after the component updates
 * (the initial mount is skipped).
 */
function createUpdateHook(useHook: EffectHook) {
  return function (effect: EffectCallback, deps?: DependencyList) {
    const mountedRef = useRef(false);

    // Reset the flag on unmount so the first effect after a Fast Refresh or
    // remount is still skipped. In StrictMode, the replayed effect also runs
    // this cleanup first, preventing the effect from firing during mount.
    useHook(() => {
      return () => {
        mountedRef.current = false;
      };
    }, []);

    useHook(() => {
      if (mountedRef.current) {
        return effect();
      } else {
        mountedRef.current = true;
      }
    }, deps);
  };
}

export default createUpdateHook;
