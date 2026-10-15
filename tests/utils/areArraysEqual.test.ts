import areArraysEqual from "../../src/utils/areArraysEqual";

describe("areArraysEqual", () => {
  it("returns true when all arrays share the same reference", () => {
    const array = [1, 2, 3];
    expect(areArraysEqual(array, array)).toBe(true);
    expect(areArraysEqual(array, array, array)).toBe(true);
  });

  it("returns true when all arrays contain the same elements", () => {
    expect(areArraysEqual([1, 2, 3], [1, 2, 3])).toBe(true);
  });

  it("returns true for more than two arrays", () => {
    expect(areArraysEqual([1, 2], [1, 2], [1, 2], [1, 2])).toBe(true);
  });

  it("returns true for empty arrays", () => {
    expect(areArraysEqual([], [])).toBe(true);
  });

  it("returns false when an element differs", () => {
    expect(areArraysEqual([1, 2, 3], [1, 2, 4])).toBe(false);
  });

  it("returns false when a later array has a different element", () => {
    expect(areArraysEqual([1, 2], [1, 2], [1, 3])).toBe(false);
  });

  it("returns false when lengths differ", () => {
    expect(areArraysEqual([1, 2, 3], [1, 2])).toBe(false);
  });

  it("returns false when a later array has a different length", () => {
    expect(areArraysEqual([1, 2], [1, 2], [1, 2, 3])).toBe(false);
  });

  it("treats NaN as equal to NaN", () => {
    expect(areArraysEqual([NaN], [NaN])).toBe(true);
  });

  it("distinguishes 0 from -0", () => {
    expect(areArraysEqual([0], [-0])).toBe(false);
  });

  it("throws when a param is null or undefined", () => {
    expect(() => areArraysEqual(null as any, [1])).toThrow(TypeError);
    expect(() => areArraysEqual([1], undefined as any)).toThrow(TypeError);
    expect(() => areArraysEqual([1], [2], null as any)).toThrow(TypeError);
  });

  it("throws when a param is not an array", () => {
    expect(() => areArraysEqual("text" as any, [1])).toThrow(TypeError);
    expect(() => areArraysEqual([1], { length: 1 } as any)).toThrow(TypeError);
  });
});
