import inBrowser from "./inBrowser";
import isObject from "./isObject";
import isFunction from "./isFunction";
import { Target, TargetCreator } from "../types";

function getTarget<T>(target: TargetCreator<T>): Target<T> {
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

export default getTarget;
