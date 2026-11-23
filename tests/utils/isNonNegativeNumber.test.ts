import isNonNegativeNumber from "../../src/utils/isNonNegativeNumber";

describe("isNonNegativeNumber", () => {
  it("accepts zero and positive finite numbers", () => {
    expect(isNonNegativeNumber(0)).toBe(true);
    expect(isNonNegativeNumber(1)).toBe(true);
    expect(isNonNegativeNumber(0.5)).toBe(true);
    expect(isNonNegativeNumber(Number.MAX_VALUE)).toBe(true);
  });

  it("rejects negative numbers", () => {
    expect(isNonNegativeNumber(-1)).toBe(false);
    expect(isNonNegativeNumber(-0.5)).toBe(false);
    expect(isNonNegativeNumber(Number.MIN_VALUE * -1)).toBe(false);
  });

  it("rejects NaN and infinity", () => {
    expect(isNonNegativeNumber(NaN)).toBe(false);
    expect(isNonNegativeNumber(Infinity)).toBe(false);
    expect(isNonNegativeNumber(-Infinity)).toBe(false);
  });

  it("rejects non-number values", () => {
    expect(isNonNegativeNumber("1")).toBe(false);
    expect(isNonNegativeNumber(null)).toBe(false);
    expect(isNonNegativeNumber(undefined)).toBe(false);
    expect(isNonNegativeNumber(true)).toBe(false);
    expect(isNonNegativeNumber({})).toBe(false);
    expect(isNonNegativeNumber(() => {})).toBe(false);
  });
});
