import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useRaf from "../src/useRaf";

describe("useRaf", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("runs the callback on the next frame after start()", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useRaf(callback));

    act(() => result.current[0]());
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(16);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("runs only once, not repeatedly", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useRaf(callback));

    act(() => result.current[0]());
    act(() => {
      jest.advanceTimersByTime(160);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("cancel() prevents the callback from running", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useRaf(callback));
    const [start, cancel] = result.current;

    act(() => start());
    act(() => cancel());

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(callback).not.toHaveBeenCalled();
  });

  it("repeated start() cancels the previous scheduling", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useRaf(callback));
    const [start] = result.current;

    act(() => {
      start();
      jest.advanceTimersByTime(8);
      start();
      jest.advanceTimersByTime(8);
    });

    // The first scheduling was cancelled by the second start
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(8);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("runs the latest callback", () => {
    const first = jest.fn();
    const { result, rerender } = renderHook(({ callback }) => useRaf(callback), {
      initialProps: { callback: first },
    });

    const latest = jest.fn();
    rerender({ callback: latest });

    act(() => result.current[0]());
    act(() => {
      jest.advanceTimersByTime(16);
    });

    expect(first).not.toHaveBeenCalled();
    expect(latest).toHaveBeenCalledTimes(1);
  });

  it("cancels automatically on unmount", () => {
    const callback = jest.fn();
    const { result, unmount } = renderHook(() => useRaf(callback));

    act(() => result.current[0]());
    unmount();

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(callback).not.toHaveBeenCalled();
  });

  it("start/cancel identities are stable", () => {
    const { result, rerender } = renderHook(() => useRaf(jest.fn()));
    const [start, cancel] = result.current;

    rerender();

    expect(result.current[0]).toBe(start);
    expect(result.current[1]).toBe(cancel);
  });
});
