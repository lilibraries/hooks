import isObject from "lodash/isObject";

/**
 * If `value` is a ReactRef (an object with a `current` property), return its
 * `current` value; otherwise return it as is.
 * Note: a true ReactRef cannot be distinguished from a plain object that has a
 * `current` property, so the latter is dereferenced too.
 */
function unref<T>(value: { current: T }): T;
function unref<T>(value: T | { current: T }): T;
function unref<T>(value: T): T;
function unref(value: any): any {
  if (isObject(value) && "current" in value) {
    return value.current;
  }
  return value;
}

export default unref;
