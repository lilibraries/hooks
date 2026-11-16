import React, { StrictMode } from "react";
import type { ReactNode } from "react";

import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useCountdown from "../src/useCountdown";

function StrictWrapper({ children }: { children?: ReactNode }) {
  return React.createElement(StrictMode, null, children);
}

// `reactStrictMode` is only read by @testing-library/react-hooks (React 16/17)
const strictOptions = { wrapper: StrictWrapper, reactStrictMode: true };

function advance(milliseconds: number) {
  act(() => {
    jest.advanceTimersByTime(milliseconds);
  });
}

describe("useCountdown", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("counts down automatically and returns the remaining milliseconds", () => {
    const { result } = renderHook(() => useCountdown({ duration: 60000 }));

    expect(typeof result.current[0]).toBe("number");
    expect(result.current[0]).toBe(60000);

    advance(3000);
    expect(result.current[0]).toBe(57000);
  });

  it("does not count down when autoStart is false", () => {
    const { result } = renderHook(() => useCountdown({ duration: 60000, autoStart: false }));

    advance(3000);
    expect(result.current[0]).toBe(60000);

    act(() => result.current[1].start());
    advance(1000);
    expect(result.current[0]).toBe(59000);
  });

  it("re-synchronizes immediately when the page becomes visible again", () => {
    const { result } = renderHook(() => useCountdown({ duration: 60000 }));

    advance(2000);
    expect(result.current[0]).toBe(58000);

    // A suspended tab: the clock moves on while no tick is delivered.
    act(() => {
      jest.setSystemTime(Date.now() + 5000);
      document.dispatchEvent(new Event("visibilitychange"));
    });

    expect(result.current[0]).toBe(53000);
  });

  it("re-synchronizes on focus without waiting for the next tick", () => {
    const { result } = renderHook(() => useCountdown({ duration: 60000 }));

    act(() => {
      jest.setSystemTime(Date.now() + 10000);
      window.dispatchEvent(new Event("focus"));
    });

    expect(result.current[0]).toBe(50000);
  });

  it("freezes the remaining time while paused and continues after resume", () => {
    const { result } = renderHook(() => useCountdown({ duration: 60000 }));

    advance(10000);
    expect(result.current[0]).toBe(50000);

    act(() => result.current[1].pause());
    expect(result.current[0]).toBe(50000);

    advance(5000);
    expect(result.current[0]).toBe(50000);

    act(() => result.current[1].resume());
    advance(2000);
    expect(result.current[0]).toBe(48000);
  });

  it("stops at zero and calls onEnd once", () => {
    const onEnd = jest.fn();
    const { result } = renderHook(() => useCountdown({ duration: 3000, onEnd }));

    advance(3000);
    expect(result.current[0]).toBe(0);
    expect(onEnd).toHaveBeenCalledTimes(1);

    advance(10000);
    expect(result.current[0]).toBe(0);
    expect(onEnd).toHaveBeenCalledTimes(1);
  });

  it("keeps counting when onEnd restarts the countdown", () => {
    let restart: (() => void) | undefined;
    const { result } = renderHook(() => {
      const countdown = useCountdown({ duration: 2000, onEnd: () => restart?.() });
      restart = () => countdown[1].start({ duration: 2000 });
      return countdown;
    });

    advance(2000);
    expect(result.current[0]).toBe(2000);

    advance(1000);
    expect(result.current[0]).toBe(1000);
    expect(jest.getTimerCount()).toBe(1);
  });

  it("calls onEnd once for an expired deadline, even under StrictMode", () => {
    const onEnd = jest.fn();
    const { result } = renderHook(
      () => useCountdown({ deadline: Date.now() - 1, onEnd }),
      strictOptions,
    );

    expect(result.current[0]).toBe(0);
    expect(onEnd).toHaveBeenCalledTimes(1);

    advance(5000);
    expect(onEnd).toHaveBeenCalledTimes(1);
  });

  it("emits onEnd once under StrictMode", () => {
    const onEnd = jest.fn();
    const { result } = renderHook(() => useCountdown({ duration: 2000, onEnd }), strictOptions);

    advance(2000);
    expect(result.current[0]).toBe(0);
    expect(onEnd).toHaveBeenCalledTimes(1);
  });

  it("stops ticking after unmount", () => {
    const onEnd = jest.fn();
    const { unmount } = renderHook(() => useCountdown({ duration: 2000, onEnd }));

    expect(jest.getTimerCount()).toBe(1);
    unmount();
    expect(jest.getTimerCount()).toBe(0);

    advance(5000);
    expect(onEnd).not.toHaveBeenCalled();
  });

  it("clears the timer once the countdown reaches zero", () => {
    const { result } = renderHook(() => useCountdown({ duration: 2000 }));

    advance(2000);

    expect(result.current[0]).toBe(0);
    expect(jest.getTimerCount()).toBe(0);
  });

  it("clears the timer while paused", () => {
    const { result } = renderHook(() => useCountdown({ duration: 2000 }));

    act(() => result.current[1].pause());

    expect(jest.getTimerCount()).toBe(0);
  });

  it("clears the queued tick when an event synchronizes to zero", () => {
    const { result } = renderHook(() => useCountdown({ duration: 2000 }));

    advance(1000);
    expect(jest.getTimerCount()).toBe(1);

    act(() => {
      jest.setSystemTime(Date.now() + 5000);
      document.dispatchEvent(new Event("visibilitychange"));
    });

    expect(result.current[0]).toBe(0);
    expect(jest.getTimerCount()).toBe(0);
  });

  it("emits onEnd once per target across pause, resume and restart", () => {
    const onEnd = jest.fn();
    const deadline = Date.now() + 2000;
    const { result } = renderHook(() => useCountdown({ deadline, onEnd }));

    advance(1000);
    act(() => result.current[1].pause());
    // Time passing while paused makes `resume()` derive a deadline that differs from the configured one.
    advance(500);
    act(() => result.current[1].resume());

    advance(1500);
    expect(onEnd).toHaveBeenCalledTimes(1);

    act(() => result.current[1].start());
    expect(onEnd).toHaveBeenCalledTimes(1);
  });

  it("honors the interval option", () => {
    const { result } = renderHook(() => useCountdown({ duration: 60000, interval: 100 }));

    advance(100);
    expect(result.current[0]).toBe(59900);

    advance(100);
    expect(result.current[0]).toBe(59800);
  });

  it("restarts with a new duration", () => {
    const { result } = renderHook(() => useCountdown({ duration: 60000 }));

    advance(10000);
    expect(result.current[0]).toBe(50000);

    act(() => result.current[1].start({ duration: 30000 }));
    expect(result.current[0]).toBe(30000);

    advance(1000);
    expect(result.current[0]).toBe(29000);
  });

  it("ignores pause on a finished countdown and resume when not paused", () => {
    const onEnd = jest.fn();
    const { result } = renderHook(() => useCountdown({ duration: 1000, onEnd }));

    advance(1000);
    expect(onEnd).toHaveBeenCalledTimes(1);

    act(() => result.current[1].pause());
    act(() => result.current[1].resume());
    advance(5000);

    expect(result.current[0]).toBe(0);
    expect(onEnd).toHaveBeenCalledTimes(1);
  });

  it("does nothing when neither deadline nor duration is provided", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const onEnd = jest.fn();
    const { result } = renderHook(() => useCountdown({ onEnd }));

    act(() => result.current[1].start());
    advance(2000);

    expect(result.current[0]).toBe(0);
    expect(onEnd).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it("does not re-render when a tick produces the same remaining time", () => {
    let renders = 0;
    const { result } = renderHook(() => {
      renders += 1;
      return useCountdown({ duration: 60000 });
    });

    const settled = renders;

    act(() => {
      window.dispatchEvent(new Event("focus"));
      window.dispatchEvent(new Event("focus"));
    });

    expect(renders).toBe(settled);
    expect(result.current[0]).toBe(60000);
  });

  it("keeps the actions identity stable", () => {
    const { result } = renderHook(() => useCountdown({ duration: 60000 }));
    const [, actions] = result.current;

    advance(1000);

    expect(result.current[0]).toBe(59000);
    expect(result.current[1]).toBe(actions);
    expect(typeof actions.start).toBe("function");
    expect(typeof actions.pause).toBe("function");
    expect(typeof actions.resume).toBe("function");
  });
});
