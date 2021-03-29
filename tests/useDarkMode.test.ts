import { useDarkMode } from "@lilib/hooks";
import { renderHook } from "@testing-library/react-hooks";

describe("useDarkTheme", () => {
  it("should return a boolean value", () => {
    const { result } = renderHook(() => useDarkMode());
    expect(typeof result.current).toBe("boolean");
  });
});
