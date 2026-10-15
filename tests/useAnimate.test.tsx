import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useAnimate from "../src/useAnimate";

const FRAME = 16;

describe("useAnimate", () => {
  beforeEach(() => {
    // Fake Date so rAF timestamps stay in sync with advanced time
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("percent increases monotonically during the animation and ends at 1", () => {
    const percentValues: number[] = [];
    const { result } = renderHook(() => useAnimate((percent) => percentValues.push(percent), 100));

    act(() => result.current[0]());

    act(() => {
      jest.advanceTimersByTime(FRAME * 6);
    });

    expect(percentValues.length).toBeGreaterThan(0);
    for (let i = 1; i < percentValues.length; i++) {
      expect(percentValues[i]).toBeGreaterThanOrEqual(percentValues[i - 1]);
    }

    act(() => {
      jest.advanceTimersByTime(FRAME * 10);
    });

    expect(percentValues.at(-1)).toBe(1);
  });

  it("percent is 0 on the first frame", () => {
    const percentValues: number[] = [];
    const { result } = renderHook(() => useAnimate((percent) => percentValues.push(percent), 100));

    act(() => result.current[0]());
    act(() => {
      jest.advanceTimersByTime(FRAME);
    });

    expect(percentValues[0]).toBe(0);
  });

  it("percent never exceeds 1", () => {
    const percentValues: number[] = [];
    const { result } = renderHook(() => useAnimate((percent) => percentValues.push(percent), 100));

    act(() => result.current[0]());
    act(() => {
      jest.advanceTimersByTime(FRAME * 50);
    });

    expect(Math.max(...percentValues)).toBeLessThanOrEqual(1);
  });

  it("stops scheduling after the animation ends (percent reaches 1)", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useAnimate(callback, 100));

    act(() => result.current[0]());
    act(() => {
      jest.advanceTimersByTime(FRAME * 20);
    });

    const count = callback.mock.calls.length;
    expect(callback).toHaveBeenLastCalledWith(1);

    act(() => {
      jest.advanceTimersByTime(FRAME * 20);
    });
    expect(callback.mock.calls.length).toBe(count);
  });

  it("cancel() stops the animation", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useAnimate(callback, 100));
    const [start, cancel] = result.current;

    act(() => start());
    act(() => {
      jest.advanceTimersByTime(FRAME * 3);
    });
    expect(callback).toHaveBeenCalled();

    act(() => cancel());
    const count = callback.mock.calls.length;

    act(() => {
      jest.advanceTimersByTime(FRAME * 20);
    });
    expect(callback.mock.calls.length).toBe(count);
  });

  it("start() restarts from the beginning after cancel()", () => {
    const percentValues: number[] = [];
    const { result } = renderHook(() => useAnimate((percent) => percentValues.push(percent), 100));
    const [start, cancel] = result.current;

    act(() => start());
    act(() => {
      jest.advanceTimersByTime(FRAME * 10);
    });
    act(() => cancel());

    const countBeforeRestart = percentValues.length;
    act(() => start());
    act(() => {
      jest.advanceTimersByTime(FRAME);
    });

    expect(percentValues.length).toBe(countBeforeRestart + 1);
    expect(percentValues.at(-1)).toBe(0);
  });

  it("supports duration in options-object form", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useAnimate(callback, { duration: 100 }));

    act(() => result.current[0]());
    act(() => {
      jest.advanceTimersByTime(FRAME * 20);
    });

    expect(callback).toHaveBeenLastCalledWith(1);
  });

  it("supports a custom algorithm function", () => {
    const percentValues: number[] = [];
    const { result } = renderHook(() =>
      useAnimate((percent) => percentValues.push(percent), {
        duration: 100,
        // Ease-out algorithm: output is smaller than the linear percent
        algorithm: (percent) => percent * percent,
      }),
    );

    act(() => result.current[0]());
    act(() => {
      jest.advanceTimersByTime(FRAME * 2);
    });

    expect(percentValues).toHaveLength(2);
    expect(percentValues[0]).toBe(0);
    // The linear percent of the 2nd frame is 0.16, so the ease-out value must be below 0.16
    expect(percentValues[1]).toBeGreaterThan(0);
    expect(percentValues[1]).toBeLessThan(0.16);
  });

  it("runs the latest callback", () => {
    const first = jest.fn();
    const { result, rerender } = renderHook(({ callback }) => useAnimate(callback, 100), {
      initialProps: { callback: first },
    });

    const latest = jest.fn();
    rerender({ callback: latest });

    act(() => result.current[0]());
    act(() => {
      jest.advanceTimersByTime(FRAME);
    });

    expect(first).not.toHaveBeenCalled();
    expect(latest).toHaveBeenCalled();
  });

  it("cancels the animation automatically on unmount", () => {
    const callback = jest.fn();
    const { result, unmount } = renderHook(() => useAnimate(callback, 100));

    act(() => result.current[0]());
    unmount();

    act(() => {
      jest.advanceTimersByTime(FRAME * 20);
    });
    expect(callback).not.toHaveBeenCalled();
  });

  it("start/cancel identities are stable", () => {
    const { result, rerender } = renderHook(() => useAnimate(jest.fn(), 100));
    const [start, cancel] = result.current;

    rerender();

    expect(result.current[0]).toBe(start);
    expect(result.current[1]).toBe(cancel);
  });
});
