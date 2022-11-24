import ResizeObserver from "resize-observer-polyfill";
import usePersist from "./usePersist";
import useSafeState from "./useSafeState";
import useLayoutTargetEffect from "./useLayoutTargetEffect";
import getTarget from "./utils/getTarget";
import { TargetCreator } from "./utils/types";

function useElementSize(target: TargetCreator<Element>) {
  const [{ width, height }, setSize] = useSafeState(() => {
    const element = getTarget(target);
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
      const element = getTarget(target);
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

  return { width, height } as const;
}

export default useElementSize;
