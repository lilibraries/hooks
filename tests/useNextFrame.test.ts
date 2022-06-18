import { act, renderHook } from "@testing-library/react-hooks";
import FakeTimers, { InstalledClock } from "@sinonjs/fake-timers";

let clock: InstalledClock;

beforeAll(() => {
  clock = FakeTimers.install();
});
afterAll(() => {
  clock.uninstall();
});

describe("useNextFrame", () => {
  it("should return the same functions when the component rerenders", () => {
    const { useNextFrame } = require("@lilib/hooks");
    const { result, rerender } = renderHook(() => useNextFrame(() => {}));
    const [start1, cancel1] = result.current;
    rerender();
    const [start2, cancel2] = result.current;

    expect(start1).toBe(start2);
    expect(cancel1).toBe(cancel2);
  });

  it("should run callback after two paiting frames", () => {
    const { useNextFrame } = require("@lilib/hooks");
    const mock = jest.fn();
    const { result } = renderHook(() => useNextFrame(mock));
    const [start] = result.current;

    expect(mock).not.toBeCalled();

    act(() => {
      start();
    });
    expect(mock).not.toBeCalled();

    act(() => {
      clock.runToFrame();
    });
    expect(mock).not.toBeCalled();

    act(() => {
      clock.runToFrame();
    });
    expect(mock).toBeCalledTimes(1);
  });

  it("should cancel correctly", () => {
    const { useNextFrame } = require("@lilib/hooks");
    const mock = jest.fn();
    const { result } = renderHook(() => useNextFrame(mock));
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
      clock.runToFrame();
    });
    expect(mock).not.toBeCalled();

    act(() => {
      clock.runAll();
    });
    expect(mock).not.toBeCalled();
  });

  it("should cancel automatically on the component unmount", () => {
    const { useNextFrame } = require("@lilib/hooks");
    const mock = jest.fn();
    const { result, unmount } = renderHook(() => useNextFrame(mock));
    const [start] = result.current;

    expect(mock).not.toBeCalled();

    act(() => {
      start();
    });
    expect(mock).not.toBeCalled();

    unmount();
    act(() => {
      clock.runAll();
    });
    expect(mock).not.toBeCalled();
  });

  it("should run latest callback", () => {
    const { useNextFrame } = require("@lilib/hooks");
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    const { result, rerender } = renderHook((mock) => useNextFrame(mock), {
      initialProps: mock1,
    });
    const [start] = result.current;

    act(() => {
      start();
    });
    rerender(mock2);
    act(() => {
      clock.runToFrame();
      clock.runToFrame();
    });

    expect(mock1).not.toBeCalled();
    expect(mock2).toBeCalledTimes(1);
  });
});
