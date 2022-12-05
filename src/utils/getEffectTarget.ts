import isObject from "lodash/isObject";
import isFunction from "lodash/isFunction";
import inBrowser from "./inBrowser";
import { Nullable, EffectTarget } from "./types";

function getEffectTarget<T>(target: EffectTarget<T>): Nullable<T> {
  if (!inBrowser) {
    return null;
  }
  if (isFunction(target)) {
    return target();
  }
  if (isObject(target) && "current" in target) {
    return target.current;
  }
  return target;
}

export default getEffectTarget;
