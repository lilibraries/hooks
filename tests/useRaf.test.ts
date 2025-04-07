import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";
import FakeTimers, { InstalledClock } from "@sinonjs/fake-timers";

let clock: InstalledClock;

beforeAll(() => {
  clock = FakeTimers.install();
});
afterAll(() => {
  clock.uninstall();
});

describe("useRaf", () => {
  it("should return the same functions when the component rerenders", () => {
    const { useRaf } = require("@lilib/hooks");
    const { result, rerender } = renderHook(() => useRaf(() => {}));
    const [start1, cancel1] = result.current;
    rerender();
    const [start2, cancel2] = result.current;

    expect(start1).toBe(start2);
    expect(cancel1).toBe(cancel2);
  });

  it("should run the callback before the browser repainting", () => {
    const { useRaf } = require("@lilib/hooks");
    const mock = jest.fn();
    const { result } = renderHook(() => useRaf(mock));
    const [start] = result.current;

    expect(mock).not.toBeCalled();

    act(() => {
      start();
    });
    expect(mock).not.toBeCalled();

    act(() => {
      clock.runToFrame();
    });
    expect(mock).toBeCalledTimes(1);
  });

  it("should cancel correctly", () => {
    const { useRaf } = require("@lilib/hooks");
    const mock = jest.fn();
    const { result } = renderHook(() => useRaf(mock));
    const [start, cancel] = result.current;

    expect(mock).not.toBeCalled();

    act(() => {
      start();
    });
    expect(mock).not.toBeCalled();

    act(() => {
      cancel();
    });
    act(() => {
      clock.runToFrame();
    });
    expect(mock).not.toBeCalled();
  });

  it("should cancel automatically on the component unmount", () => {
    const { useRaf } = require("@lilib/hooks");
    const mock = jest.fn();
    const { result, unmount } = renderHook(() => useRaf(mock));
    const [start] = result.current;

    expect(mock).not.toBeCalled();

    act(() => {
      start();
    });
    expect(mock).not.toBeCalled();

    unmount();
    act(() => {
      clock.runToFrame();
    });
    expect(mock).not.toBeCalled();
  });

  it("should run latest callback", () => {
    const { useRaf } = require("@lilib/hooks");
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    const { result, rerender } = renderHook((mock) => useRaf(mock), {
      initialProps: mock1,
    });
    const [start] = result.current;

    act(() => {
      start();
    });
    rerender(mock2);
    act(() => {
      clock.runToFrame();
    });

    expect(mock1).not.toBeCalled();
    expect(mock2).toBeCalledTimes(1);
  });
});
