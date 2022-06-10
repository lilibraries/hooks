import isBrowser from "./isBrowser";
import isObject from "./isObject";
import isFunction from "./isFunction";
import { TargetCreator, Target } from "./types";

function getTarget<T>(target: TargetCreator<T>): Target<T> {
  if (!isBrowser) {
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

export default getTarget;
