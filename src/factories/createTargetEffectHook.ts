import { DependencyList, EffectCallback, useEffect, useRef } from "react";
import useUnmount from "../useUnmount";
import getTarget from "../utils/getTarget";
import areDepsEqual from "../utils/areDepsEqual";
import { Target, TargetCreator } from "../types";

function createTargetEffectHook(useHook: typeof useEffect) {
  return function (
    effect: EffectCallback,
    deps: DependencyList,
    targets: TargetCreator<any>[]
  ) {
    const mountedRef = useRef(false);
    const depsRef = useRef<DependencyList>([]);
    const deps2Ref = useRef<Target<any>>([]);
    const destroyRef = useRef<(() => void) | void>();

    function destroy() {
      destroyRef.current?.();
    }

    useHook(() => {
      const deps2 = targets.map(getTarget);

      function create() {
        depsRef.current = deps;
        deps2Ref.current = deps2;
        destroyRef.current = effect();
      }

      if (mountedRef.current) {
        if (
          !areDepsEqual(deps, depsRef.current) ||
          !areDepsEqual(deps2, deps2Ref.current)
        ) {
          destroy();
          create();
        }
      } else {
        create();
        mountedRef.current = true;
      }
    });

    useUnmount(() => {
      destroy();
      mountedRef.current = false;
    });
  };
}

export default createTargetEffectHook;
