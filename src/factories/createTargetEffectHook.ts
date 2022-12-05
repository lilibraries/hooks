import { DependencyList, EffectCallback, useEffect, useRef } from "react";
import useUnmount from "../useUnmount";
import getTarget from "../utils/getTarget";
import areArraysEqual from "../utils/areArraysEqual";
import { Target, Nullable } from "../utils/types";

function createTargetEffectHook(useHook: typeof useEffect) {
  return function (
    effect: EffectCallback,
    deps: DependencyList,
    targets: ReadonlyArray<Target<any>>
  ) {
    const mountedRef = useRef(false);
    const depsRef = useRef<DependencyList>([]);
    const deps2Ref = useRef<Nullable<any>[]>([]);
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
          !areArraysEqual(deps, depsRef.current) ||
          !areArraysEqual(deps2, deps2Ref.current)
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
