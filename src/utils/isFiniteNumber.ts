/** Check whether a value is a finite number (neither `NaN` nor `Infinity`). */
function isFiniteNumber(value: any): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

export default isFiniteNumber;
