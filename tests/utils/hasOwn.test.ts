import { hasOwn } from "@lilib/hooks";

describe("utils/hasOwn", () => {
  it("should check correctly", () => {
    const obj = { key: "value" };

    expect(hasOwn(obj, "key")).toBe(true);
    expect(!!obj.toString).toBe(true);
    expect(hasOwn(obj, "toString")).toBe(false);
  });
});
