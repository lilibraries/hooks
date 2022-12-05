import areArraysEqual from "../../src/utils/areArraysEqual";

describe("utils/areArraysEqual", () => {
  it("should compare correctly", () => {
    expect(areArraysEqual([], [])).toBe(true);
    expect(areArraysEqual([{}], [{}])).toBe(false);
    expect(areArraysEqual([1, 2, 3], [1, 2, 3], [1, 2, 3])).toBe(true);
    expect(areArraysEqual([1, 2, 3], [1, 2, 3], [3, 2, 1])).toBe(false);
    expect(areArraysEqual([1, 2, 3], [1, 2, 3, 4])).toBe(false);
  });

  it("should check params correctly", () => {
    const invalidParam: any = undefined;

    expect(() => {
      areArraysEqual(invalidParam, []);
    }).toThrow(TypeError);

    expect(() => {
      areArraysEqual([], invalidParam);
    }).toThrow(TypeError);

    expect(() => {
      areArraysEqual([], [], invalidParam);
    }).toThrow(TypeError);
  });
});
