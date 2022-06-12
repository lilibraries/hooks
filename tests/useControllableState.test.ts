import { useControllableState } from "@lilib/hooks";
import { act, renderHook } from "@testing-library/react-hooks";

describe("useControllableState", () => {
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
