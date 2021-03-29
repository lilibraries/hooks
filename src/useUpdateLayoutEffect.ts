import { DependencyList, EffectCallback, useRef } from "react";
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

function useUpdateLayoutEffect(effect: EffectCallback, deps?: DependencyList) {
  const mountedRef = useRef(false);

  useIsomorphicLayoutEffect(
    () => {
      if (mountedRef.current) {
        return effect();
      } else {
        mountedRef.current = true;
      }
    },
    deps // eslint-disable-line
  );
}

export default useUpdateLayoutEffect;
