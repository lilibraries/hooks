import { useDebugValue } from "react";
import ResizeObserver from "resize-observer-polyfill";
import { EffectTarget, getEffectTarget } from "@lilib/utils";
import usePersist from "./usePersist";
import useSafeState from "./useSafeState";
import useLayoutTargetEffect from "./useLayoutTargetEffect";

function useElementSize(target: EffectTarget<Element>) {
  const [{ width, height }, setSize] = useSafeState(() => {
    const element = getEffectTarget(target);
    if (element) {
      const rect = element.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    } else {
      return { width: undefined, height: undefined };
    }
  });

  const handler = usePersist((entries: ResizeObserverEntry[]) => {
    if (entries[0]) {
      const rect = entries[0].target.getBoundingClientRect();
      if (rect.width !== width || rect.height !== height) {
        setSize({ width: rect.width, height: rect.height });
      }
    }
  });

  useLayoutTargetEffect(
    () => {
      const element = getEffectTarget(target);
      if (!element) {
        return;
      }
      const observer = new ResizeObserver(handler);
      observer.observe(element);
      return () => {
        observer.disconnect();
      };
    },
    [],
    [target]
  );

  useDebugValue({ width, height });

  return { width, height } as const;
}

export default useElementSize;
