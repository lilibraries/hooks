import { usePageVisible } from "@lilib/hooks";
import { renderHook } from "@testing-library/react-hooks";

describe("usePageVisible", () => {
  it("should return a boolean value", () => {
    const { result } = renderHook(() => usePageVisible());
    expect(typeof result.current).toBe("boolean");
  });
});
