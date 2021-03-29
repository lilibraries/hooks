import { useOnline } from "@lilib/hooks";
import { renderHook } from "@testing-library/react-hooks";

describe("useOnline", () => {
  it("should return a boolean value", () => {
    const { result } = renderHook(() => useOnline());
    expect(typeof result.current).toBe("boolean");
  });
});
