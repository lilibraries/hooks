import type { EffectCallback } from "react";

import type { EffectHook } from "../utils/types";

/**
 * Factory for creating mount-style hooks: takes an effect-style hook and returns
 * a hook that runs the effect after the component mounts.
 */
function createMountHook(useHook: EffectHook) {
  return function (effect: EffectCallback) {
    useHook(() => {
      return effect();
    }, []);
  };
}

export default createMountHook;
