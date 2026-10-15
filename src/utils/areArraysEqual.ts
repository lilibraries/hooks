/**
 * Shallowly compare multiple arrays for equality.
 */
function areArraysEqual(x: readonly any[], y: readonly any[], ...args: (readonly any[])[]) {
  const arrays = [x, y, ...args];

  if (arrays.some((array) => array == null)) {
    throw new TypeError("The params of `areArraysEqual` must not be null or undefined.");
  }
  if (arrays.some((array) => !Array.isArray(array))) {
    throw new TypeError("The params of `areArraysEqual` must be arrays.");
  }

  const base = arrays[0];
  const length = arrays.length;

  // Fast path: all arrays share the same reference
  let same = true;
  for (let i = 1; i < length; i++) {
    if (base !== arrays[i]) {
      same = false;
      break;
    }
  }
  if (same) {
    return true;
  }

  // Fast path: different lengths are never equal
  for (let i = 1; i < length; i++) {
    if (base.length !== arrays[i].length) {
      return false;
    }
  }

  // Shallow element-wise comparison using Object.is for equality
  // (distinguishes NaN from NaN and 0 from -0)
  for (let i = 1; i < length; i++) {
    const array = arrays[i];
    const baseLength = base.length;

    for (let j = 0; j < baseLength; j++) {
      if (!Object.is(base[j], array[j])) {
        return false;
      }
    }
  }

  return true;
}

export default areArraysEqual;
