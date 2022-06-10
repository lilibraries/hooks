import { useEffect, useRef, EffectCallback, DependencyList } from "react";

function createUpdateHook(useHook: typeof useEffect) {
  return function (effect: EffectCallback, deps?: DependencyList) {
    const mountedRef = useRef(false);

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
