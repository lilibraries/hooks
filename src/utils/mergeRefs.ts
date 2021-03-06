import { Ref, RefCallback, MutableRefObject } from "react";
import isObject from "./isObject";
import isFunction from "./isFunction";

function mergeRefs<T>(...refs: Ref<T>[]): RefCallback<T> {
  return (instance: T) => {
    refs.forEach((ref) => {
      if (isFunction(ref)) {
        ref(instance);
      } else if (isObject(ref) && "current" in ref) {
        (ref as MutableRefObject<T>).current = instance;
      }
    });
  };
}

export default mergeRefs;
