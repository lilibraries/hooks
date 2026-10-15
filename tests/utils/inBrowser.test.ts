import inBrowser from "../../src/utils/inBrowser";

describe("inBrowser", () => {
  it("is true in a browser environment", () => {
    expect(inBrowser).toBe(true);
  });
});
