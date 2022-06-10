import { DependencyList, EffectCallback, useRef } from "react";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

function useLayoutUpdate(effect: EffectCallback, deps?: DependencyList) {
  const mountedRef = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (mountedRef.current) {
      return effect();
    } else {
      mountedRef.current = true;
    }
  }, deps);
}

export default useLayoutUpdate;
