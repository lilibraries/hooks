import { createRef, useImperativeHandle } from "react";
import { useMergedRef } from "@lilib/hooks";
import { renderHook } from "@testing-library/react-hooks";

describe("useMergedRef", () => {
  it("should combine multiple refs into one", () => {
    const ref1 = createRef<any>();
    let ref2Value: any;
    const ref2 = (value: any) => {
      ref2Value = value;
    };

    renderHook(() => {
      const mergedRef = useMergedRef(ref1, ref2);
      useImperativeHandle(mergedRef, () => "value");
    });

    expect(ref1.current).toBe("value");
    expect(ref2Value).toBe("value");
  });
});
