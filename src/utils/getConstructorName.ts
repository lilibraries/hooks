import isString from "lodash/isString";

function getConstructorName(instance: object): string {
  let name = instance && instance.constructor && instance.constructor.name;
  if (isString(name) && name !== "") {
    return name;
  }
  return Object.prototype.toString.call(instance).slice(8, -1);
}

export default getConstructorName;
