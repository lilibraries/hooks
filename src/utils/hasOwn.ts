const hasOwnProperty = Object.prototype.hasOwnProperty;

function hasOwn(object: unknown, key: PropertyKey) {
  return hasOwnProperty.call(object, key);
}

export default hasOwn;
