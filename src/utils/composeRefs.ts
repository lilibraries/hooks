import type { MutableRefObject, Ref, RefCallback } from "react";

import isFunction from "lodash/isFunction";
import isObject from "lodash/isObject";

// Combine multiple refs (callback refs or ref objects) into a single callback
// ref: when React binds/unbinds, every ref is updated accordingly
function composeRefs<T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> {
  return (instance: T | null) => {
    refs.forEach((ref) => {
      if (isFunction(ref)) {
        ref(instance);
      } else if (isObject(ref) && "current" in ref) {
        (ref as MutableRefObject<T | null>).current = instance;
      }
    });
  };
}

export default composeRefs;
