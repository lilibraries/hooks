import inBrowser from "../../src/utils/inBrowser";

describe("utils/inBrowser", () => {
  it("should be a boolean", () => {
    expect(typeof inBrowser).toBe("boolean");
  });
});
