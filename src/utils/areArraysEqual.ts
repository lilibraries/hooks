function areArraysEqual(
  x: readonly any[],
  y: readonly any[],
  ...args: (readonly any[])[]
) {
  const arrays = [x, y, ...args];

  if (arguments.length < 2) {
    throw new TypeError(
      "The length of `areArraysEqual`'s params must be >= 2."
    );
  }
  if (arrays.some((array) => !Array.isArray(array))) {
    throw new TypeError("The params of `areArraysEqual` must be arrays.");
  }

  const base = arrays[0];
  const length = arrays.length;

  let same = true;
  for (let i = 1; i < length; i++) {
    if (base !== arrays[i]) {
      same = false;
    }
  }
  if (same) {
    return true;
  }

  for (let i = 1; i < length; i++) {
    if (base.length !== arrays[i].length) {
      return false;
    }
  }

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
