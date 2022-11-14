import { useWindowSize } from "@lilib/hooks";
import renderHook from "./helpers/renderHook";

describe("useWindowSize", () => {
  it("should return window size", () => {
    const { result } = renderHook(() => useWindowSize());
    expect("width" in result.current).toBe(true);
    expect("height" in result.current).toBe(true);
  });
});
