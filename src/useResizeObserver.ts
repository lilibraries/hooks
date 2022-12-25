import ResizeObserver from "resize-observer-polyfill";
import { EffectTarget, getEffectTarget } from "@lilib/utils";
import usePersist from "./usePersist";
import useLayoutTargetEffect from "./useLayoutTargetEffect";

function useResizeObserver(
  target: EffectTarget<Element>,
  listener: (entries: ResizeObserverEntry[]) => void
) {
  const handler = usePersist(listener);

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
}

export default useResizeObserver;
