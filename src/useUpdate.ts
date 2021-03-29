import { DependencyList, EffectCallback, useEffect, useRef } from "react";

function useUpdate(effect: EffectCallback, deps?: DependencyList) {
  const mountedRef = useRef(false);

  useEffect(
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

export default useUpdate;
