import { isObject } from "@lilib/hooks";

describe("utils/isObject", () => {
  it("should validate correctly", () => {
    const valid: any[] = [{}, Object.create(null), [], /test/];
    const invalid: any[] = [undefined, null, 0, "", true, Symbol(), () => {}];

    valid.forEach((value) => {
      expect(isObject(value)).toBe(true);
    });

    invalid.forEach((value) => {
      expect(isObject(value)).toBe(false);
    });
  });
});
