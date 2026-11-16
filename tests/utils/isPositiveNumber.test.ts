import isPositiveNumber from "../../src/utils/isPositiveNumber";

describe("isPositiveNumber", () => {
  it("accepts positive finite numbers", () => {
    expect(isPositiveNumber(1)).toBe(true);
    expect(isPositiveNumber(0.5)).toBe(true);
    expect(isPositiveNumber(Number.MAX_VALUE)).toBe(true);
  });

  it("rejects zero and negative numbers", () => {
    expect(isPositiveNumber(0)).toBe(false);
    expect(isPositiveNumber(-1)).toBe(false);
    expect(isPositiveNumber(-0.5)).toBe(false);
  });

  it("rejects NaN and infinity", () => {
    expect(isPositiveNumber(NaN)).toBe(false);
    expect(isPositiveNumber(Infinity)).toBe(false);
    expect(isPositiveNumber(-Infinity)).toBe(false);
  });

  it("rejects non-number values", () => {
    expect(isPositiveNumber("1")).toBe(false);
    expect(isPositiveNumber(null)).toBe(false);
    expect(isPositiveNumber(undefined)).toBe(false);
    expect(isPositiveNumber(true)).toBe(false);
    expect(isPositiveNumber({})).toBe(false);
    expect(isPositiveNumber(() => {})).toBe(false);
  });
});
