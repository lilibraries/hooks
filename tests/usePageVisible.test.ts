import { usePageVisible } from "@lilib/hooks";
import renderHook from "./helpers/renderHook";

describe("usePageVisible", () => {
  it("should return a boolean value", () => {
    const { result } = renderHook(() => usePageVisible());
    expect(typeof result.current).toBe("boolean");
  });
});
