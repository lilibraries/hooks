import isFiniteNumber from "./isFiniteNumber";

/** Check whether a value is a positive finite number. */
function isPositiveNumber(value: any): value is number {
  return isFiniteNumber(value) && value > 0;
}

export default isPositiveNumber;
