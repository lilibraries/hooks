import { useSafeState } from "@lilib/hooks";
import { act, renderHook } from "@testing-library/react-hooks";

describe("useSafeState", () => {
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
