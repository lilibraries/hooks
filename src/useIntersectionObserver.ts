import "intersection-observer";
import { EffectTarget, getEffectTarget } from "@lilib/utils";
import usePersist from "./usePersist";
import useLayoutTargetEffect from "./useLayoutTargetEffect";

export interface IntersectionObserverHookOptions {
  root?: EffectTarget<Element | Document>;
  rootMargin?: string;
  threshold?: number | number[];
}

function useIntersectionObserver(
  target: EffectTarget<Element>,
  listener: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverHookOptions
) {
  const handler = usePersist(listener);
  const { root, rootMargin, threshold } = options || {};

  useLayoutTargetEffect(
    () => {
      const rootElement = getEffectTarget(root);
      const targetElement = getEffectTarget(target);

      if (!targetElement) {
        return;
      }

      const observer = new IntersectionObserver(handler, {
        root: rootElement,
        rootMargin,
        threshold,
      });

      observer.observe(targetElement);
      return () => {
        observer.disconnect();
      };
    },
    [rootMargin, threshold ? threshold.toString() : "0"],
    [root, target]
  );
}

export default useIntersectionObserver;
