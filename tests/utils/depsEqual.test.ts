import { depsEqual } from "@lilib/hooks";

describe("utils/depsEqual", () => {
  it("should compare correctly", () => {
    expect(depsEqual([], [])).toBe(true);
    expect(depsEqual([{}], [{}])).toBe(false);
    expect(depsEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(depsEqual([1, 2, 1], [1, 2, 3])).toBe(false);
    expect(depsEqual([1, 2, 3], [1, 2, 3, 4])).toBe(false);
  });
});
