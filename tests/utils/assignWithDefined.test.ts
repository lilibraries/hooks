import assignWithDefined from "../../src/utils/assignWithDefined";

describe("utils/assignWithDefined", () => {
  it("should merge objects correcty", () => {
    const a = { a: "a", b: "b", c: "c" };
    const b = { a: "a1", b: undefined };
    const c = { d: "d", e: undefined };
    const result = assignWithDefined(a, b, c);

    expect(result).toBe(a);
    expect(result).not.toBe(b);
    expect(result).not.toBe(c);
    expect(result).toEqual({ a: "a1", b: "b", c: "c", d: "d", e: undefined });
  });
});
