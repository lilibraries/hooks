import { useControllableState } from "@lilib/hooks";
import { act } from "react-dom/test-utils";
import renderHook from "./helpers/renderHook";

describe("useControllableState", () => {
  it("should always return the same `setState` function", () => {
    const { result, rerender } = renderHook(() => useControllableState());
    const [, setState1] = result.current;
    rerender();
    const [, setState2] = result.current;

    expect(setState1).toBe(setState2);
  });

  it("can be uncontrolled", () => {
    const { result } = renderHook(() => useControllableState("default"));

    expect(result.current[0]).toBe("default");

    act(() => {
      result.current[1]("new state");
    });
    expect(result.current[0]).toBe("new state");
  });

  it("can be controlled", () => {
    const { result } = renderHook(() =>
      useControllableState("default", "state")
    );

    expect(result.current[0]).toBe("state");

    act(() => {
      result.current[1]("new state");
    });
    expect(result.current[0]).toBe("state");
  });
});
