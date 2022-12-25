import { useDebugValue } from "react";
import { EffectTarget, getEffectTarget } from "@lilib/utils";
import useSafeState from "./useSafeState";
import useResizeObserver from "./useResizeObserver";

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

  useResizeObserver(target, (entries: ResizeObserverEntry[]) => {
    if (entries[0]) {
      const rect = entries[0].target.getBoundingClientRect();
      if (rect.width !== width || rect.height !== height) {
        setSize({ width: rect.width, height: rect.height });
      }
    }
  });

  useDebugValue({ width, height });

  return { width, height } as const;
}

export default useElementSize;
