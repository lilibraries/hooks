import { isBrowser } from "@lilib/hooks";

describe("utils/isBrowser", () => {
  it("should be a boolean", () => {
    expect(typeof isBrowser).toBe("boolean");
  });
});
