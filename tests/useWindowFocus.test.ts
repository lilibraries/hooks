import { useWindowFocus } from "@lilib/hooks";
import renderHook from "./helpers/renderHook";

describe("useWindowFocus", () => {
  it("should return a boolean value", () => {
    const { result } = renderHook(() => useWindowFocus());
    expect(typeof result.current).toBe("boolean");
  });
});
