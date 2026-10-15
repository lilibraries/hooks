import { useRef, type DependencyList, type EffectCallback } from "react";

import areArraysEqual from "../utils/areArraysEqual";
import type { EffectHook } from "../utils/types";
import unref from "../utils/unref";

/**
 * Factory for creating ref-aware effect hooks: takes an effect-style hook and
 * returns a hook whose dependency array supports ReactRef values (each ref is
 * automatically dereferenced to `ref.current` before comparison).
 */
function createRefEffectHook(useHook: EffectHook) {
  return function (effect: EffectCallback, deps?: DependencyList) {
    const mountedRef = useRef(false);
    const depsRef = useRef<unknown[] | undefined>(undefined);
    const destroyRef = useRef<(() => void) | void>(undefined);

    function destroy() {
      destroyRef.current?.();
    }

    useHook(() => {
      const resolvedDeps = deps?.map(unref);

      function create() {
        depsRef.current = resolvedDeps;
        destroyRef.current = effect();
      }

      if (!mountedRef.current) {
        create();
        mountedRef.current = true;
      } else if (
        resolvedDeps === undefined ||
        depsRef.current === undefined ||
        !areArraysEqual(resolvedDeps, depsRef.current)
      ) {
        destroy();
        create();
      }
    });

    // Run cleanup through the injected useHook on unmount so destruction happens
    // in the same phase as creation (e.g. useLayoutRefEffect tears down during
    // the layout phase rather than after paint).
    useHook(() => {
      return () => {
        destroy();
        destroyRef.current = undefined;
        mountedRef.current = false;
      };
    }, []);
  };
}

export default createRefEffectHook;
