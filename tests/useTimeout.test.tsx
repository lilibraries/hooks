import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useTimeout from "../src/useTimeout";

describe("useTimeout", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("runs the callback after the specified time following start()", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useTimeout(callback, 100));

    act(() => result.current[0]());

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(99);
    });
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("runs immediately (0ms) when timeout is omitted", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useTimeout(callback));

    act(() => result.current[0]());
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(0);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("repeated start() resets the timer", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useTimeout(callback, 100));
    const [start] = result.current;

    act(() => {
      start();
      jest.advanceTimersByTime(50);
    });

    act(() => {
      start();
      jest.advanceTimersByTime(99);
    });
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("cancel() prevents the callback from running", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useTimeout(callback, 100));
    const [start, cancel] = result.current;

    act(() => start());
    act(() => cancel());

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(callback).not.toHaveBeenCalled();
  });

  it("cancel() before starting does not throw", () => {
    const { result } = renderHook(() => useTimeout(jest.fn(), 100));
    const [, cancel] = result.current;

    expect(() => act(() => cancel())).not.toThrow();
  });

  it("cancels unexecuted timers automatically on unmount", () => {
    const callback = jest.fn();
    const { result, unmount } = renderHook(() => useTimeout(callback, 100));

    act(() => result.current[0]());
    unmount();

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(callback).not.toHaveBeenCalled();
  });

  it("always runs the latest callback when executing", () => {
    const first = jest.fn();
    const { result, rerender } = renderHook(({ callback }) => useTimeout(callback, 100), {
      initialProps: { callback: first },
    });

    const latest = jest.fn();
    rerender({ callback: latest });

    act(() => result.current[0]());
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(first).not.toHaveBeenCalled();
    expect(latest).toHaveBeenCalledTimes(1);
  });

  it("start/cancel identities are stable", () => {
    const { result, rerender } = renderHook(() => useTimeout(jest.fn(), 100));
    const [start, cancel] = result.current;

    rerender();

    expect(result.current[0]).toBe(start);
    expect(result.current[1]).toBe(cancel);
  });
});
