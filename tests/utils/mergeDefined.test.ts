import mergeDefined from "../../src/utils/mergeDefined";

describe("mergeDefined", () => {
  it("merges multiple objects", () => {
    expect(mergeDefined({ a: 1 }, { b: 2 }, { c: 3 })).toEqual({
      a: 1,
      b: 2,
      c: 3,
    });
  });

  it("lets later objects override earlier values", () => {
    expect(mergeDefined({ a: 1, b: 2 }, { b: 3 })).toEqual({ a: 1, b: 3 });
  });

  it("skips undefined values when the key already exists", () => {
    expect(mergeDefined({ a: 1 }, { a: undefined })).toEqual({ a: 1 });
  });

  it("lets a defined value replace an earlier undefined value", () => {
    expect(mergeDefined({ a: undefined }, { a: 2 })).toEqual({ a: 2 });
  });

  it("keeps undefined values when the key is new", () => {
    expect(mergeDefined({ a: undefined })).toEqual({ a: undefined });
  });

  it("lets null values override", () => {
    expect(mergeDefined({ a: 1 }, { a: null })).toEqual({ a: null });
  });

  it("skips null and undefined source objects", () => {
    expect(mergeDefined(null as any, { a: 1 }, undefined as any)).toEqual({
      a: 1,
    });
  });

  it("does not mutate the source objects", () => {
    const defaults = { a: 1 };
    const options = { b: 2 };
    const merged = mergeDefined(defaults, options);

    expect(merged).toEqual({ a: 1, b: 2 });
    expect(defaults).toEqual({ a: 1 });
    expect(options).toEqual({ b: 2 });
  });

  it("returns a new object even with a single argument", () => {
    const source = { a: 1 };
    const merged = mergeDefined(source);

    expect(merged).toEqual({ a: 1 });
    expect(merged).not.toBe(source);
  });

  it("copies only own enumerable properties", () => {
    const source = Object.create({ inherited: 1 });
    source.own = 2;

    expect(mergeDefined(source)).toEqual({ own: 2 });
  });
});
