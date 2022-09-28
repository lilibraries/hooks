function areDepsEqual(x: readonly unknown[], y: readonly unknown[]) {
  if (x === y) {
    return true;
  }

  if (x.length !== y.length) {
    return false;
  }

  let i = 0;
  let length = x.length;
  for (i; i < length; i++) {
    if (!Object.is(x[i], y[i])) {
      return false;
    }
  }

  return true;
}

export default areDepsEqual;
