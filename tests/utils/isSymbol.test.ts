import { isSymbol } from "@lilib/hooks";

describe("utils/isSymbol", () => {
  it("should validate correctly", () => {
    const valid: any[] = [Symbol(), Symbol("label")];
    const invalid: any[] = [
      0,
      "",
      {},
      [],
      null,
      true,
      false,
      "string",
      undefined,
      /test/,
      Symbol,
      () => {},
      Object.create(null),
    ];

    valid.forEach((value) => {
      expect(isSymbol(value)).toBe(true);
    });

    invalid.forEach((value) => {
      expect(isSymbol(value)).toBe(false);
    });
  });
});
