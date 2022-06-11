import { DependencyList, EffectCallback, useEffect, useRef } from "react";
import useUnmount from "../useUnmount";
import depsEqual from "../utils/depsEqual";
import getTarget from "../utils/getTarget";
import { Target, TargetCreator } from "../utils/types";

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
          !depsEqual(deps, depsRef.current) ||
          !depsEqual(deps2, deps2Ref.current)
        ) {
          destroy();
          create();
        }
      } else {
        create();
        mountedRef.current = true;
      }
    });

    useUnmount(destroy);
  };
}

export default createTargetEffectHook;
