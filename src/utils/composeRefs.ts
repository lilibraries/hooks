import type { MutableRefObject, Ref, RefCallback } from "react";

import isFunction from "lodash/isFunction";
import isObject from "lodash/isObject";

function setRef<T>(ref: Ref<T> | undefined, instance: T | null) {
  if (isFunction(ref)) {
    return ref(instance);
  } else if (isObject(ref) && "current" in ref) {
    (ref as MutableRefObject<T | null>).current = instance;
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
        cleanups.forEach((cleanup, index) => {
          if (isFunction(cleanup)) {
            cleanup();
          } else {
            setRef(refs[index], null);
          }
        });
      };
    }
  };
}

export default composeRefs;
