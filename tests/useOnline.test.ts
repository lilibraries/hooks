import { useOnline } from "@lilib/hooks";
import renderHook from "./helpers/renderHook";

describe("useOnline", () => {
  it("should return a boolean value", () => {
    const { result } = renderHook(() => useOnline());
    expect(typeof result.current).toBe("boolean");
  });
});
