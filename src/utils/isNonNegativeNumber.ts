import isFiniteNumber from "./isFiniteNumber";

/** Check whether a value is a non-negative finite number. */
function isNonNegativeNumber(value: any): value is number {
  return isFiniteNumber(value) && value >= 0;
}

export default isNonNegativeNumber;
