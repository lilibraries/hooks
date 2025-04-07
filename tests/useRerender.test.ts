import { useRerender } from "@lilib/hooks";
import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

describe("useRerender", () => {
  it("should update the component when the rerender function calls", () => {
    let count = 0;
    const { rerender, result } = renderHook(() => {
      count++;
      return useRerender();
    });

    expect(count).toBe(1);
    rerender();
    expect(count).toBe(2);
    act(() => result.current());
    expect(count).toBe(3);
    act(() => result.current());
    expect(count).toBe(4);
  });

  it("should return the same function when the component rerenders", () => {
    const { rerender, result } = renderHook(() => {
      return useRerender();
    });
    const tmp1 = result.current;
    rerender();
    const tmp2 = result.current;
    act(() => result.current());
    const tmp3 = result.current;

    expect(tmp1).toBe(tmp2);
    expect(tmp1).toBe(tmp3);
  });
});
