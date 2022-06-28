import { useEffect, useRef, EffectCallback, DependencyList } from "react";
import useUnmount from "../useUnmount";

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

    useUnmount(() => {
      mountedRef.current = false;
    });
  };
}

export default createUpdateHook;
