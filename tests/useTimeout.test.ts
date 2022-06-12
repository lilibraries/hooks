import { useTimeout } from "@lilib/hooks";
import { act, renderHook } from "@testing-library/react-hooks";

describe("useTimeout", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should return the same actions when the component rerenders", () => {
    const { result, rerender } = renderHook(() => useTimeout(() => {}, 10));
    const [start1, cancel1] = result.current;
    rerender();
    const [start2, cancel2] = result.current;

    expect(start1).toBe(start2);
    expect(cancel1).toBe(cancel2);
  });

  it("should not run callback automatically", () => {
    const mock = jest.fn();
    renderHook(() => useTimeout(mock, 10));

    jest.advanceTimersByTime(100);
    expect(mock).not.toBeCalled();
  });

  it("should run callback correctly", () => {
    const mock = jest.fn();
    const { result, unmount } = renderHook(() => useTimeout(mock, 10));
    const [start, cancel] = result.current;

    act(() => start());
    jest.advanceTimersByTime(9);

    act(() => start());
    jest.advanceTimersByTime(9);
    expect(mock).not.toBeCalled();

    act(() => cancel());
    jest.advanceTimersByTime(10);
    expect(mock).not.toBeCalled();

    act(() => start());
    jest.advanceTimersByTime(10);
    expect(mock).toBeCalledTimes(1);

    jest.advanceTimersByTime(20);
    expect(mock).toBeCalledTimes(1);

    act(() => start());
    jest.advanceTimersByTime(10);
    expect(mock).toBeCalledTimes(2);

    act(() => start());
    jest.advanceTimersByTime(9);

    unmount();
    jest.runOnlyPendingTimers();
    expect(mock).toBeCalledTimes(2);
  });

  it("should always run latest callback", () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    const mock3 = jest.fn();
    const { result, rerender } = renderHook(
      (callback) => useTimeout(callback, 10),
      { initialProps: mock1 }
    );
    const [start] = result.current;

    act(() => start());
    jest.advanceTimersByTime(5);
    rerender(mock2);
    jest.advanceTimersByTime(4);
    rerender(mock3);
    jest.runOnlyPendingTimers();

    expect(mock1).not.toBeCalled();
    expect(mock2).not.toBeCalled();
    expect(mock3).toBeCalledTimes(1);
  });
});
