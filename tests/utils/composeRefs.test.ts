import composeRefs from "../../src/utils/composeRefs";

describe("utils/composeRefs", () => {
  it("should compose multiple refs correctly", () => {
    let ref1Value: any = undefined;
    const ref1 = (value: any) => {
      ref1Value = value;
    };
    const ref2 = { current: undefined };
    const mergedRef = composeRefs(ref1, ref2);
    mergedRef("value");

    expect(typeof mergedRef).toBe("function");
    expect(ref1Value).toBe("value");
    expect(ref2.current).toBe("value");
  });
});
