import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useInterval from "../src/useInterval";

describe("useInterval", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("runs the callback repeatedly at a fixed interval after start()", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useInterval(callback, 100));

    act(() => result.current[0]());
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(callback).toHaveBeenCalledTimes(2);

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it("cancel() stops the loop", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useInterval(callback, 100));
    const [start, cancel] = result.current;

    act(() => start());
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(callback).toHaveBeenCalledTimes(1);

    act(() => cancel());
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("repeated start() resets the loop", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useInterval(callback, 100));
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

  it("runs the latest callback every time", () => {
    const first = jest.fn();
    const { result, rerender } = renderHook(({ callback }) => useInterval(callback, 100), {
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

  it("stops the loop automatically on unmount", () => {
    const callback = jest.fn();
    const { result, unmount } = renderHook(() => useInterval(callback, 100));

    act(() => result.current[0]());
    unmount();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(callback).not.toHaveBeenCalled();
  });

  it("runs at a 0ms interval when interval is omitted", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useInterval(callback));

    act(() => result.current[0]());

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(callback).toHaveBeenCalled();

    const count = callback.mock.calls.length;
    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(callback.mock.calls.length).toBeGreaterThan(count);
  });

  it("start/cancel identities are stable", () => {
    const { result, rerender } = renderHook(() => useInterval(jest.fn(), 100));
    const [start, cancel] = result.current;

    rerender();

    expect(result.current[0]).toBe(start);
    expect(result.current[1]).toBe(cancel);
  });
});
