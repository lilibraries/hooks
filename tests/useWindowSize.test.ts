import { useWindowSize } from "@lilib/hooks";
import { renderHook } from "@testing-library/react-hooks";

describe("useWindowSize", () => {
  it("should return window size", () => {
    const { result } = renderHook(() => useWindowSize());
    expect(typeof result.current.width).toBe("number");
    expect(typeof result.current.height).toBe("number");
  });
});
