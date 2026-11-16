import isFiniteNumber from "../../src/utils/isFiniteNumber";

describe("isFiniteNumber", () => {
  it("accepts finite numbers", () => {
    expect(isFiniteNumber(0)).toBe(true);
    expect(isFiniteNumber(-1)).toBe(true);
    expect(isFiniteNumber(100)).toBe(true);
    expect(isFiniteNumber(0.5)).toBe(true);
    expect(isFiniteNumber(Number.MIN_VALUE)).toBe(true);
    expect(isFiniteNumber(Number.MAX_VALUE)).toBe(true);
  });

  it("rejects NaN and infinity", () => {
    expect(isFiniteNumber(NaN)).toBe(false);
    expect(isFiniteNumber(Infinity)).toBe(false);
    expect(isFiniteNumber(-Infinity)).toBe(false);
  });

  it("rejects non-number values", () => {
    expect(isFiniteNumber("1")).toBe(false);
    expect(isFiniteNumber(null)).toBe(false);
    expect(isFiniteNumber(undefined)).toBe(false);
    expect(isFiniteNumber(true)).toBe(false);
    expect(isFiniteNumber({})).toBe(false);
    expect(isFiniteNumber(() => {})).toBe(false);
  });
});
