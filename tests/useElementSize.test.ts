import { useElementSize } from "@lilib/hooks";
import renderHook from "./helpers/renderHook";

describe("useElementSize", () => {
  it("should return element size", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);

    const { result } = renderHook(() => {
      return useElementSize(() => element);
    });

    expect("width" in result.current).toBe(true);
    expect("height" in result.current).toBe(true);
  });
});
