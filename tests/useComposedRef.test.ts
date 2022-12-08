import { createRef, useImperativeHandle } from "react";
import { useComposedRef } from "@lilib/hooks";
import renderHook from "./helpers/renderHook";

describe("useComposedRef", () => {
  it("should compose multiple refs into one", () => {
    const ref1 = createRef<any>();
    let ref2Value: any;
    const ref2 = (value: any) => {
      ref2Value = value;
    };

    renderHook(() => {
      const composedRef = useComposedRef(ref1, ref2);
      useImperativeHandle(composedRef, () => "value");
    });

    expect(ref1.current).toBe("value");
    expect(ref2Value).toBe("value");
  });
});
