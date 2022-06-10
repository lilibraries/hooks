import { isFunction } from "@lilib/hooks";

describe("utils/isFunction", () => {
  it("should validate correctly", () => {
    const valid: any[] = [() => {}, function () {}];
    const invalid: any[] = [undefined, null, 0, "", true, [], {}, Symbol()];

    valid.forEach((value) => {
      expect(isFunction(value)).toBe(true);
    });

    invalid.forEach((value) => {
      expect(isFunction(value)).toBe(false);
    });
  });
});
