import mergeRefs from "../../src/utils/mergeRefs";

describe("utils/mergeRefs", () => {
  it("should merge multiple refs", () => {
    let ref1Value: any = undefined;
    const ref1 = (value: any) => {
      ref1Value = value;
    };
    const ref2 = { current: undefined };
    const mergedRef = mergeRefs(ref1, ref2);
    mergedRef("value");

    expect(typeof mergedRef).toBe("function");
    expect(ref1Value).toBe("value");
    expect(ref2.current).toBe("value");
  });
});
