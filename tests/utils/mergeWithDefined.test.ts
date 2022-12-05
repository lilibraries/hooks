import mergeWithDefined from "../../src/utils/mergeWithDefined";

describe("utils/mergeWithDefined", () => {
  it("should merge objects correcty", () => {
    const a = { a: "a", b: "b", c: "c" };
    const b = { a: "a1", b: undefined };
    const c = { d: "d", e: undefined };
    const result = mergeWithDefined(a, b, c);

    expect(result).not.toBe(a);
    expect(result).not.toBe(b);
    expect(result).not.toBe(c);
    expect(result).toEqual({ a: "a1", b: "b", c: "c", d: "d", e: undefined });
  });
});
