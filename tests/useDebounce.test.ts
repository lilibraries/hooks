import { useDebounce } from "@lilib/hooks";
import { act } from "react-dom/test-utils";
import renderHook from "./helpers/renderHook";
import FakeTimers, { InstalledClock } from "@sinonjs/fake-timers";

describe("useDebounce", () => {
  let clock: InstalledClock;

  beforeEach(() => {
    clock = FakeTimers.install();
  });
  afterEach(() => {
    clock.uninstall();
  });

  it("should return the same actions when the component rerenders", () => {
    const { result, rerender } = renderHook(() => useDebounce(() => {}, 10));
    const [debounced1, actions1] = result.current;
    rerender();
    const [debounced2, actions2] = result.current;

    expect(debounced1).toBe(debounced2);
    expect(actions1.flush).toBe(actions2.flush);
    expect(actions1.cancel).toBe(actions2.cancel);
  });

  it("should not run callback automatically", () => {
    const mock = jest.fn();
    const { rerender, unmount } = renderHook(() => {
      useDebounce(mock, 10);
    });
    rerender();
    unmount();
    expect(mock).not.toBeCalled();
  });

  it("should call the latest callback", () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    const mock3 = jest.fn();
    const { result, rerender } = renderHook((mock) => useDebounce(mock, 10), {
      initialProps: mock1,
    });
    const [debounced] = result.current;

    rerender(mock2);
    act(() => debounced());
    clock.tick(9);
    rerender(mock3);
    clock.tick(1);

    expect(mock1).not.toBeCalled();
    expect(mock2).not.toBeCalled();
    expect(mock3).toBeCalledTimes(1);
  });

  it("should clear timer when the component is unmounted", () => {
    const mock = jest.fn();
    const { result, unmount } = renderHook(() => useDebounce(mock, 10));
    const [debounced] = result.current;

    act(() => debounced());
    unmount();
    clock.tick(100);
    expect(mock).not.toBeCalled();
  });

  it("should trigger callback on the trailing edge by default", () => {
    const mock = jest.fn();
    const { result } = renderHook(() => useDebounce(mock, 10));
    const [debounced] = result.current;

    act(() => debounced());
    expect(mock).not.toBeCalled();
    clock.tick(10);
    expect(mock).toBeCalledTimes(1);

    act(() => debounced());
    expect(mock).toBeCalledTimes(1);
    clock.tick(5);
    act(() => debounced());
    clock.tick(5);
    act(() => debounced());
    clock.tick(10);
    expect(mock).toBeCalledTimes(2);
  });

  it("should trigger callback on the two edges when only the `options.leading` is specified", () => {
    const mock = jest.fn();
    const { result } = renderHook(() =>
      useDebounce(mock, { wait: 10, leading: true })
    );
    const [debounced] = result.current;

    act(() => debounced());
    expect(mock).toBeCalledTimes(1);
    clock.tick(5);
    act(() => debounced());
    clock.tick(5);
    act(() => debounced());
    clock.tick(100);
    expect(mock).toBeCalledTimes(2);
    act(() => debounced());
    expect(mock).toBeCalledTimes(3);
    clock.tick(5);
    act(() => debounced());
    clock.tick(100);
    expect(mock).toBeCalledTimes(4);
  });

  it("should only trigger on the leading edge if the `options.leading` is true and the `options.trailing` is false", () => {
    const mock = jest.fn();
    const { result } = renderHook(() =>
      useDebounce(mock, { wait: 10, leading: true, trailing: false })
    );
    const [debounced] = result.current;

    act(() => debounced());
    expect(mock).toBeCalledTimes(1);
    clock.tick(5);
    act(() => debounced());
    clock.tick(5);
    act(() => debounced());
    clock.tick(100);
    expect(mock).toBeCalledTimes(1);
    act(() => debounced());
    expect(mock).toBeCalledTimes(2);
    clock.tick(100);
    expect(mock).toBeCalledTimes(2);
  });

  it("should not trigger callback if two edge case options are false", () => {
    const mock = jest.fn();
    const { result } = renderHook(() =>
      useDebounce(mock, { wait: 10, leading: false, trailing: false })
    );
    const [debounced] = result.current;

    act(() => debounced());
    clock.tick(5);
    act(() => debounced());
    clock.tick(5);
    act(() => debounced());
    clock.tick(100);
    act(() => debounced());
    clock.tick(100);
    expect(mock).not.toBeCalled();
  });

  it("could change options dynamically", () => {
    const mock = jest.fn();
    const { result, rerender } = renderHook(
      (options) => useDebounce(mock, options),
      { initialProps: { wait: 10, leading: false, trailing: false } }
    );
    const [debounced] = result.current;

    act(() => debounced());
    expect(mock).not.toBeCalled();
    clock.tick(100);
    expect(mock).not.toBeCalled();

    rerender({ wait: 10, leading: true, trailing: false });
    act(() => debounced());
    expect(mock).toBeCalledTimes(1);
    clock.tick(100);
    expect(mock).toBeCalledTimes(1);

    rerender({ wait: 10, leading: true, trailing: true });
    act(() => debounced());
    expect(mock).toBeCalledTimes(2);
    clock.tick(5);
    act(() => debounced());
    clock.tick(100);
    expect(mock).toBeCalledTimes(3);

    rerender({ wait: 10, leading: false, trailing: true });
    act(() => debounced());
    expect(mock).toBeCalledTimes(3);
    clock.tick(100);
    expect(mock).toBeCalledTimes(4);

    act(() => debounced());
    clock.tick(5);
    rerender({ wait: 20, leading: false, trailing: true });
    clock.tick(10);
    expect(mock).toBeCalledTimes(5);
    clock.tick(5);
    expect(mock).toBeCalledTimes(5);
  });

  it("should flush and cancel correctly", () => {
    const mock = jest.fn();
    const { result } = renderHook(() => useDebounce(mock, 10));
    const [debounced, { flush, cancel }] = result.current;

    act(() => debounced());
    clock.tick(5);
    expect(mock).not.toBeCalled();
    act(() => flush());
    expect(mock).toBeCalledTimes(1);

    act(() => debounced());
    clock.tick(5);
    expect(mock).toBeCalledTimes(1);
    act(() => cancel());
    clock.tick(100);
    expect(mock).toBeCalledTimes(1);
  });
});
