import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useSafeState from "../src/useSafeState";

describe("useSafeState", () => {
  it("returns the initial state", () => {
    const { result } = renderHook(() => useSafeState(0));
    expect(result.current[0]).toBe(0);
  });

  it("supports the function form of the initial state", () => {
    const { result } = renderHook(() =>
      useSafeState<number>(() => {
        return 10;
      }),
    );
    expect(result.current[0]).toBe(10);
  });

  it("state is undefined without an initial value", () => {
    const { result } = renderHook(() => useSafeState());
    expect(result.current[0]).toBeUndefined();
  });

  it("can set a new value", () => {
    const { result } = renderHook(() => useSafeState(0));
    const [, setState] = result.current;

    act(() => setState(5));
    expect(result.current[0]).toBe(5);
  });

  it("supports the function form of updates", () => {
    const { result } = renderHook(() => useSafeState(1));
    const [, setState] = result.current;

    act(() => setState((prev) => (prev as number) + 1));
    expect(result.current[0]).toBe(2);
  });

  it("setState after unmount neither throws nor updates", () => {
    const { result, unmount } = renderHook(() => useSafeState(0));
    const [, setState] = result.current;

    unmount();

    expect(() => {
      act(() => {
        setState(1);
        setState((prev) => (prev as number) + 1);
      });
    }).not.toThrow();
  });

  it("setState calls after unmount do not trigger update warnings", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const { result, unmount } = renderHook(() => useSafeState(0));
    const [, setState] = result.current;

    unmount();

    act(() => setState(99));

    expect(errorSpy).not.toHaveBeenCalled();
    expect(result.current[0]).toBe(0);
    errorSpy.mockRestore();
  });

  it("setState identity is stable", () => {
    const { result, rerender } = renderHook(() => useSafeState(0));
    const [, setState] = result.current;

    rerender();

    expect(result.current[1]).toBe(setState);
  });
});
