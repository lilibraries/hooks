import isPageVisible from "../../src/utils/isPageVisible";

describe("utils/isPageVisible", () => {
  it("should return a boolean value", () => {
    expect(typeof isPageVisible()).toBe("boolean");
  });
});
