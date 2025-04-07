import { useIdle } from "@lilib/hooks";
import act from "./helpers/act";
import renderHook from "./helpers/renderHook";
import FakeTimers, { InstalledClock } from "@sinonjs/fake-timers";

describe("useIdle", () => {
  let clock: InstalledClock;

  beforeEach(() => {
    clock = FakeTimers.install();
  });
  afterEach(() => {
    clock.uninstall();
  });

  it("should return the same functions when the component rerenders", () => {
    const { result, rerender } = renderHook(() => useIdle(() => {}));
    const [start1, cancel1] = result.current;
    rerender();
    const [start2, cancel2] = result.current;

    expect(start1).toBe(start2);
    expect(cancel1).toBe(cancel2);
  });

  it("should run callback in the free time at the end of a frame", () => {
    const mock = jest.fn();
    const { result } = renderHook(() => useIdle(mock));
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
    const mock = jest.fn();
    const { result } = renderHook(() => useIdle(mock));
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
    const mock = jest.fn();
    const { result, unmount } = renderHook(() => useIdle(mock));
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
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    const { result, rerender } = renderHook((mock) => useIdle(mock), {
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
