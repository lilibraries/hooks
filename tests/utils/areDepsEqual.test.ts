import { areDepsEqual } from "@lilib/hooks";

describe("utils/areDepsEqual", () => {
  it("should compare correctly", () => {
    expect(areDepsEqual([], [])).toBe(true);
    expect(areDepsEqual([{}], [{}])).toBe(false);
    expect(areDepsEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(areDepsEqual([1, 2, 1], [1, 2, 3])).toBe(false);
    expect(areDepsEqual([1, 2, 3], [1, 2, 3, 4])).toBe(false);
  });
});
