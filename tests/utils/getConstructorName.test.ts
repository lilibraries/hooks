import getConstructorName from "../../src/utils/getConstructorName";

describe("utils/getConstructorName", () => {
  it("should get constructor name correctly", () => {
    class A {}
    class B extends A {}
    function C() {}

    const a = new A();
    const b = new B();
    // @ts-ignore
    const c = new C();

    expect(getConstructorName(a)).toBe("A");
    expect(getConstructorName(b)).toBe("B");
    expect(getConstructorName(c)).toBe("C");
    expect(getConstructorName(A)).toBe("Function");
    expect(getConstructorName(C)).toBe("Function");
    // @ts-ignore
    expect(getConstructorName(null)).toBe("Null");
    // @ts-ignore
    expect(getConstructorName(undefined)).toBe("Undefined");
  });
});
