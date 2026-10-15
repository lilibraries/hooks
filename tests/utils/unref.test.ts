import unref from "../../src/utils/unref";

describe("unref", () => {
  it("returns the current value of a ref object", () => {
    const ref = { current: "value" };
    expect(unref(ref)).toBe("value");
  });

  it("returns non-object values as is", () => {
    expect(unref("text")).toBe("text");
    expect(unref(42)).toBe(42);
    expect(unref(true)).toBe(true);
    expect(unref(null)).toBeNull();
    expect(unref(undefined)).toBeUndefined();
  });

  it("returns functions as is", () => {
    const fn = () => {};
    expect(unref(fn)).toBe(fn);
  });

  it("returns plain objects without a current property as is", () => {
    const obj = { key: "value" };
    expect(unref(obj)).toBe(obj);
  });

  it("dereferences plain objects that have a current property", () => {
    expect(unref({ current: 1 })).toBe(1);
  });

  it("returns null for a ref object whose current is null", () => {
    expect(unref({ current: null })).toBeNull();
  });
});
