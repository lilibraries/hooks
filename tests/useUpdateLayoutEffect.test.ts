import { useUpdateLayoutEffect } from "@lilib/hooks";
import { renderHook } from "@testing-library/react-hooks";

describe("useUpdateLayoutEffect", () => {
  it("should run effect after the component is updated without deps", () => {
    const destroy = jest.fn();
    const create = jest.fn().mockReturnValue(destroy);
    const { rerender, unmount } = renderHook(() => {
      useUpdateLayoutEffect(create);
    });

    expect(create).toBeCalledTimes(0);
    expect(destroy).toBeCalledTimes(0);
    rerender();
    expect(create).toBeCalledTimes(1);
    expect(destroy).toBeCalledTimes(0);
    rerender();
    expect(create).toBeCalledTimes(2);
    expect(destroy).toBeCalledTimes(1);
    unmount();
    expect(create).toBeCalledTimes(2);
    expect(destroy).toBeCalledTimes(2);
  });

  it("should run effect after the deps are changed", () => {
    const destroy = jest.fn();
    const create = jest.fn().mockReturnValue(destroy);
    const { rerender, unmount } = renderHook(
      (deps) => {
        useUpdateLayoutEffect(create, deps);
      },
      { initialProps: [0] }
    );

    expect(create).toBeCalledTimes(0);
    expect(destroy).toBeCalledTimes(0);
    rerender([0]);
    expect(create).toBeCalledTimes(0);
    expect(destroy).toBeCalledTimes(0);
    rerender([1]);
    expect(create).toBeCalledTimes(1);
    expect(destroy).toBeCalledTimes(0);
    rerender([2]);
    expect(create).toBeCalledTimes(2);
    expect(destroy).toBeCalledTimes(1);
    rerender([2]);
    expect(create).toBeCalledTimes(2);
    expect(destroy).toBeCalledTimes(1);
    unmount();
    expect(create).toBeCalledTimes(2);
    expect(destroy).toBeCalledTimes(2);
  });

  it("should not run effect with an empty array as deps", () => {
    const destroy = jest.fn();
    const create = jest.fn().mockReturnValue(destroy);
    const { rerender, unmount } = renderHook(() => {
      useUpdateLayoutEffect(create, []);
    });

    expect(create).toBeCalledTimes(0);
    expect(destroy).toBeCalledTimes(0);
    rerender();
    expect(create).toBeCalledTimes(0);
    expect(destroy).toBeCalledTimes(0);
    rerender();
    expect(create).toBeCalledTimes(0);
    expect(destroy).toBeCalledTimes(0);
    unmount();
    expect(create).toBeCalledTimes(0);
    expect(destroy).toBeCalledTimes(0);
  });
});
