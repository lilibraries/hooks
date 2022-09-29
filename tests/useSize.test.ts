import { useSize } from "@lilib/hooks";
import renderHook from "./helpers/renderHook";

describe("useSize", () => {
  it("should return element size", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);

    const { result } = renderHook(() => {
      return useSize(() => element);
    });

    expect(typeof result.current.width).toBe("number");
    expect(typeof result.current.height).toBe("number");
  });
});
