import { useSafeState } from "@lilib/hooks";
import { act } from "react-dom/test-utils";
import renderHook from "./helpers/renderHook";

describe("useSafeState", () => {
  it("should always return the same `setState` function", () => {
    const { result, rerender } = renderHook(() => useSafeState());
    const [, setState1] = result.current;
    rerender();
    const [, setState2] = result.current;

    expect(setState1).toBe(setState2);
  });

  it("should not set state after the component is unmounted", () => {
    const { result, rerender, unmount } = renderHook(() => useSafeState(0));

    expect(result.current[0]).toBe(0);

    rerender();
    expect(result.current[0]).toBe(0);

    act(() => {
      result.current[1](1);
    });
    expect(result.current[0]).toBe(1);

    unmount();
    expect(result.current[0]).toBe(1);

    act(() => {
      result.current[1](2);
    });
    expect(result.current[0]).toBe(1);
  });

  it("can pass a function to `setState`", () => {
    const { result } = renderHook(() => useSafeState(() => 0));

    expect(result.current[0]).toBe(0);

    act(() => {
      result.current[1]((prevState) => {
        return prevState + 1;
      });
    });
    expect(result.current[0]).toBe(1);
  });
});
