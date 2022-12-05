import isObject from "lodash/isObject";
import isFunction from "lodash/isFunction";

function getDisplayName(value: unknown): string {
  let displayName: string = "";
  if (isFunction(value)) {
    displayName =
      (value as any).displayName || value.name || "[object Function]";
  } else if (isObject(value)) {
    displayName = Object.prototype.toString.call(value);
  }
  return String(displayName || value);
}

export default getDisplayName;
