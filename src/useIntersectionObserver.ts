import "intersection-observer";

import type { RefObject } from "react";

import useLayoutRefEffect from "./useLayoutRefEffect";
import usePersist from "./usePersist";
import unref from "./utils/unref";

export interface UseIntersectionObserverOptions {
  root?: Element | Document | RefObject<Element | Document | null>;
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * Watch whether two elements intersect.
 *
 * @param target The observed target or its ref.
 * @param listener The listener function.
 * @param options The options object, see IntersectionObserver options.
 */
function useIntersectionObserver(
  target: Element | RefObject<Element | null>,
  listener: (entries: IntersectionObserverEntry[]) => void,
  options?: UseIntersectionObserverOptions,
) {
  const handler = usePersist(listener);
  const { root, rootMargin, threshold } = options || {};

  useLayoutRefEffect(() => {
    const rootElement = unref(root);
    const targetElement = unref(target);

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
    // An array threshold is a new reference on every render, so it is serialized
    // to a string to keep the dep stable (identical content avoids recreating the observer).
  }, [rootMargin, threshold ? threshold.toString() : "0", root, target]);
}

export default useIntersectionObserver;
