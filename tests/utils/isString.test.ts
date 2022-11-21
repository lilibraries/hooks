import { isString } from "@lilib/hooks";

describe("utils/isString", () => {
  it("should validate correctly", () => {
    const valid: any[] = ["", "string"];
    const invalid: any[] = [
      0,
      {},
      [],
      null,
      true,
      false,
      undefined,
      /test/,
      Symbol(),
      () => {},
      Object.create(null),
    ];

    valid.forEach((value) => {
      expect(isString(value)).toBe(true);
    });

    invalid.forEach((value) => {
      expect(isString(value)).toBe(false);
    });
  });
});
