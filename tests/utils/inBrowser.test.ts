import { inBrowser } from "@lilib/hooks";

describe("utils/inBrowser", () => {
  it("should be a boolean", () => {
    expect(typeof inBrowser).toBe("boolean");
  });
});
