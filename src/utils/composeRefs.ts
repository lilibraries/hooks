import type { Ref, RefCallback } from "react";

import isFunction from "lodash/isFunction";
import isObject from "lodash/isObject";

function setRef<T>(ref: Ref<T> | undefined, instance: T | null) {
  if (isFunction(ref)) {
    return ref(instance);
  } else if (isObject(ref) && "current" in ref) {
    ref.current = instance;
  }
}

// Combine multiple refs (callback refs or ref objects) into a single callback
// ref: when React binds/unbinds, every ref is updated accordingly
function composeRefs<T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> {
  return (instance: T | null) => {
    const cleanups = refs.map((ref) => setRef(ref, instance));

    // Keep the void/null lifecycle for refs without cleanup, including React < 19.
    if (cleanups.some(isFunction)) {
      return () => {
        let failed = false;
        let failure: unknown;

        // Isolate failures like React does per ref, so one throwing cleanup
        // cannot leave the remaining refs pointing to the detached instance.
        // Only the first failure is rethrown; the ones after it are dropped.
        cleanups.forEach((cleanup, index) => {
          try {
            if (isFunction(cleanup)) {
              cleanup();
            } else {
              setRef(refs[index], null);
            }
          } catch (reason) {
            if (!failed) {
              failed = true;
              failure = reason;
            }
          }
        });

        if (failed) {
          throw failure;
        }
      };
    }
  };
}

export default composeRefs;
