import { useState } from "react";
import act from "./helpers/act";
import renderHook from "./helpers/renderHook";
import FakeTimers, { InstalledClock } from "@sinonjs/fake-timers";

let clock: InstalledClock;

beforeAll(() => {
  clock = FakeTimers.install();
});
afterAll(() => {
  clock.uninstall();
});

describe("useAnimation", () => {
  it("should return the same functions when the component rerenders", () => {
    const { useAnimation } = require("@lilib/hooks");
    const { result, rerender } = renderHook(() => useAnimation(() => {}, 300));
    const [start1, cancel1] = result.current;
    rerender();
    const [start2, cancel2] = result.current;

    expect(start1).toBe(start2);
    expect(cancel1).toBe(cancel2);
  });

  it("should run latest callback", () => {
    const { useAnimation } = require("@lilib/hooks");
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    const { result, rerender } = renderHook((mock) => useAnimation(mock, 300), {
      initialProps: mock1,
    });
    const [start] = result.current;

    act(() => {
      start();
    });
    rerender(mock2);
    act(() => {
      clock.runAll();
    });

    expect(mock1).not.toBeCalled();
    expect(mock2).toBeCalled();
  });

  it("should calculate percentage correctly", () => {
    const { useAnimation } = require("@lilib/hooks");
    const { result } = renderHook(() => {
      const [percentage, setPercentage] = useState(0);
      const [start] = useAnimation(setPercentage, 100000);
      return { start, percentage } as const;
    });
    const { start } = result.current;

    expect(result.current.percentage).toBe(0);

    act(() => {
      start();
      clock.tick(50000);
    });
    expect(result.current.percentage).toBeCloseTo(0.5);

    act(() => {
      clock.tick(50000);
      clock.runAll();
    });
    expect(result.current.percentage).toBeCloseTo(1);
  });

  it("should cancel automatically on the component unmount", () => {
    const { useAnimation } = require("@lilib/hooks");
    const { result, unmount } = renderHook(() => {
      const [percentage, setPercentage] = useState(0);
      const [start] = useAnimation(setPercentage, 100000);
      return { start, percentage } as const;
    });
    const { start } = result.current;

    act(() => {
      start();
      clock.tick(50000);
    });
    expect(result.current.percentage).toBeCloseTo(0.5);

    unmount();
    act(() => {
      clock.tick(50000);
      clock.runAll();
    });
    expect(result.current.percentage).toBeCloseTo(0.5);
  });

  it("should cancel correctly", () => {
    const { useAnimation } = require("@lilib/hooks");
    const { result } = renderHook(() => {
      const [percentage, setPercentage] = useState(0);
      const [start, cancel] = useAnimation(setPercentage, 100000);
      return { start, cancel, percentage } as const;
    });
    const { start, cancel } = result.current;

    act(() => {
      start();
      clock.tick(50000);
    });
    expect(result.current.percentage).toBeCloseTo(0.5);

    act(() => {
      cancel();
      clock.tick(50000);
      clock.runAll();
    });
    expect(result.current.percentage).toBeCloseTo(0.5);
  });

  it("should cancel automatically when restarts", () => {
    const { useAnimation } = require("@lilib/hooks");
    const { result } = renderHook(() => {
      const [percentage, setPercentage] = useState(0);
      const [start] = useAnimation(setPercentage, 100000);
      return { start, percentage } as const;
    });
    const { start } = result.current;

    act(() => {
      start();
      clock.tick(50000);
    });
    expect(result.current.percentage).toBeCloseTo(0.5);

    act(() => {
      start();
      clock.runToFrame();
    });
    expect(result.current.percentage).toBeCloseTo(0);

    act(() => {
      clock.tick(100000);
      clock.runAll();
    });
    expect(result.current.percentage).toBe(1);
  });

  it("should handle with algorithm option", () => {
    const { useAnimation } = require("@lilib/hooks");
    const { result } = renderHook(() => {
      const [percentage, setPercentage] = useState(0);
      const [start] = useAnimation(setPercentage, {
        duration: 100000,
        algorithm: (percent: number) => percent / 2,
      });
      return { start, percentage } as const;
    });
    const { start } = result.current;

    act(() => {
      start();
      clock.tick(50000);
    });
    expect(result.current.percentage).toBeCloseTo(0.25);

    act(() => {
      clock.tick(50000);
      clock.runAll();
    });
    expect(result.current.percentage).toBeCloseTo(0.5);
  });

  it("could change options dynamically", () => {
    const { useAnimation } = require("@lilib/hooks");
    const { result, rerender } = renderHook(
      (options) => {
        const [percentage, setPercentage] = useState(0);
        const [start] = useAnimation(setPercentage, options);
        return { start, percentage } as const;
      },
      {
        initialProps: {
          duration: 100000,
          algorithm: (percent: number) => percent / 2,
        },
      }
    );
    const { start } = result.current;

    act(() => {
      start();
      clock.tick(50000);
    });
    expect(result.current.percentage).toBeCloseTo(0.25);

    rerender({ duration: 80000, algorithm: (percent: number) => percent * 2 });
    act(() => {
      clock.tick(30000);
    });
    expect(result.current.percentage).toBeCloseTo(2);
  });

  it("should warn when put a non-positive number as the duration", () => {
    const { useAnimation } = require("@lilib/hooks");

    let messages: string[] = [];
    const warn = jest.fn().mockImplementation((message: string) => {
      messages.push(message);
    });
    jest.spyOn(console, "error").mockImplementation(warn);

    renderHook(() => useAnimation(() => {}));
    renderHook(() => useAnimation(() => {}, 0));
    renderHook(() => useAnimation(() => {}, -1));
    renderHook(() => useAnimation(() => {}, NaN));

    messages.forEach((message) => {
      expect(message).toBe(
        "Warning(useAnimation): You should provide a positive number as the duration."
      );
    });

    warn.mockReset();
  });
});
