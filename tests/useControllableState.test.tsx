import { act } from "@testing-library/react";
import { StrictMode, useLayoutEffect } from "react";

import renderHook from "./helpers/renderHook";

import useControllableState from "../src/useControllableState";

describe("useControllableState", () => {
  it("starts with `defaultValue` when uncontrolled", () => {
    const { result } = renderHook(() => useControllableState({ defaultValue: "initial" }));
    expect(result.current[0]).toBe("initial");
  });

  it("starts with `undefined` when neither `value` nor `defaultValue` is provided", () => {
    const { result } = renderHook(() => useControllableState<string>({}));
    expect(result.current[0]).toBeUndefined();
  });

  it("treats falsy `value` values as controlled", () => {
    const { result } = renderHook(() => useControllableState({ value: 0 }));
    expect(result.current[0]).toBe(0);
  });

  it("updates the internal state when uncontrolled", () => {
    const { result } = renderHook(() => useControllableState({ defaultValue: 0 }));

    act(() => result.current[1](1));
    expect(result.current[0]).toBe(1);

    act(() => result.current[1]((prevState) => prevState + 1));
    expect(result.current[0]).toBe(2);
  });

  it("accumulates consecutive functional updates in the same batch", () => {
    const { result } = renderHook(() => useControllableState({ defaultValue: 0 }));

    act(() => {
      result.current[1]((prevState) => prevState + 1);
      result.current[1]((prevState) => prevState + 1);
    });

    expect(result.current[0]).toBe(2);
  });

  it("calls `onChange` with the next value when uncontrolled", () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useControllableState({ defaultValue: 0, onChange }));

    act(() => result.current[1](1));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it("does not call `onChange` when the value does not change", () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useControllableState({ defaultValue: 0, onChange }));

    act(() => result.current[1](0));

    expect(result.current[0]).toBe(0);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("returns the controlled value and does not store changes internally", () => {
    const onChange = jest.fn();
    const { result, rerender } = renderHook(
      ({ value }: { value: number }) => useControllableState({ value, defaultValue: 0, onChange }),
      { initialProps: { value: 1 } },
    );

    expect(result.current[0]).toBe(1);

    act(() => result.current[1](2));

    expect(result.current[0]).toBe(1);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(2);

    rerender({ value: 2 });
    expect(result.current[0]).toBe(2);
  });

  it("does not call `onChange` when the controlled value is set to itself", () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useControllableState({ value: 1, onChange }));

    act(() => result.current[1](1));

    expect(onChange).not.toHaveBeenCalled();
  });

  it("treats an `undefined` `value` as uncontrolled", () => {
    const { result } = renderHook(
      ({ value }: { value: number | undefined }) =>
        useControllableState({ value, defaultValue: 0 }),
      { initialProps: { value: undefined as number | undefined } },
    );

    act(() => result.current[1](3));

    expect(result.current[0]).toBe(3);
  });

  it("commits the latest controlled value on the first uncontrolled render", () => {
    const committed: (number | undefined)[] = [];
    const { rerender } = renderHook(
      ({ value }: { value: number | undefined }) => {
        const [state] = useControllableState({ value, defaultValue: 0 });
        useLayoutEffect(() => {
          committed.push(state);
        });
        return state;
      },
      { initialProps: { value: 5 as number | undefined } },
    );

    // The internal state still holds 5 while the controlled value becomes 7.
    rerender({ value: 7 });
    expect(committed[committed.length - 1]).toBe(7);

    committed.length = 0;
    rerender({ value: undefined });

    expect(committed).toEqual([7]);
  });

  it("continues from the last controlled value after switching to uncontrolled", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: number | undefined }) =>
        useControllableState({ value, defaultValue: 0 }),
      { initialProps: { value: 5 as number | undefined } },
    );

    rerender({ value: 7 });
    rerender({ value: undefined });
    expect(result.current[0]).toBe(7);

    act(() => result.current[1](6));
    expect(result.current[0]).toBe(6);
  });

  it("does not store controlled changes and restores the controlled value on switch", () => {
    let renders = 0;
    const { result, rerender } = renderHook(
      ({ value }: { value: number | undefined }) => {
        renders += 1;
        return useControllableState({ value, defaultValue: 0 });
      },
      { initialProps: { value: 7 as number | undefined } },
    );

    const rendersBeforeSet = renders;
    act(() => result.current[1](2));
    // Storing the change in the internal state would commit another render.
    expect(renders).toBe(rendersBeforeSet);
    expect(result.current[0]).toBe(7);

    rerender({ value: undefined });
    expect(result.current[0]).toBe(7);
  });

  it("does not call `onChange` when switching modes", () => {
    const onChange = jest.fn();
    const { rerender } = renderHook(
      ({ value }: { value: number | undefined }) =>
        useControllableState({ value, defaultValue: 0, onChange }),
      { initialProps: { value: 7 as number | undefined } },
    );

    rerender({ value: undefined });
    rerender({ value: 9 });

    expect(onChange).not.toHaveBeenCalled();
  });

  it("resumes from the latest controlled value across repeated switches", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: number | undefined }) =>
        useControllableState({ value, defaultValue: 0 }),
      { initialProps: { value: undefined as number | undefined } },
    );

    rerender({ value: 1 });
    rerender({ value: undefined });
    expect(result.current[0]).toBe(1);

    act(() => result.current[1](2));
    rerender({ value: 3 });
    rerender({ value: undefined });
    expect(result.current[0]).toBe(3);

    rerender({ value: 4 });
    rerender({ value: undefined });
    expect(result.current[0]).toBe(4);
  });

  it("passes the controlled value to updater functions", () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useControllableState({ value: 1, onChange }));

    act(() => result.current[1]((prevState) => prevState + 1));

    expect(result.current[0]).toBe(1);
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("uses the controlled value after switching from uncontrolled", () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: number | undefined }) =>
        useControllableState({ value, defaultValue: 0 }),
      { initialProps: { value: undefined as number | undefined } },
    );

    act(() => result.current[1](3));
    expect(result.current[0]).toBe(3);

    rerender({ value: 10 });
    expect(result.current[0]).toBe(10);
  });

  it("keeps a stable `setState` identity", () => {
    const { result, rerender } = renderHook(() => useControllableState({ defaultValue: 0 }));
    const setState = result.current[1];

    rerender();

    expect(result.current[1]).toBe(setState);
  });

  it("ignores `setState` after unmount", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const onChange = jest.fn();
    const { result, unmount } = renderHook(() =>
      useControllableState({ defaultValue: 0, onChange }),
    );

    unmount();
    act(() => result.current[1](1));

    expect(onChange).not.toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it("settles to the correct state under StrictMode", () => {
    const onChange = jest.fn();
    const { result } = renderHook(() => useControllableState({ defaultValue: 0, onChange }), {
      wrapper: StrictMode,
    });

    act(() => result.current[1](1));

    expect(result.current[0]).toBe(1);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("resumes from the latest controlled value after switching under StrictMode", () => {
    const props: { value?: number } = { value: 5 };
    const { result, rerender } = renderHook(
      () => useControllableState({ ...props, defaultValue: 0 }),
      {
        wrapper: StrictMode,
      },
    );

    props.value = 7;
    rerender();
    props.value = undefined;
    rerender();

    expect(result.current[0]).toBe(7);
  });
});
