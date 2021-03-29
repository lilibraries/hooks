import { DependencyList } from "react";
import { useCreate } from "@lilib/hooks";
import { renderHook } from "@testing-library/react-hooks";

describe("useCreate", () => {
  it("should invoke the function and create value correctly without deps", () => {
    let count = 0;
    const create = jest.fn(() => count++);
    const { result, rerender, unmount } = renderHook(() => useCreate(create));

    expect(create).toBeCalledTimes(1);
    expect(result.current).toBe(0);
    rerender();
    expect(create).toBeCalledTimes(1);
    expect(result.current).toBe(0);
    rerender();
    expect(create).toBeCalledTimes(1);
    expect(result.current).toBe(0);
    unmount();
    expect(create).toBeCalledTimes(1);
    expect(result.current).toBe(0);
  });

  it("should invoke the function and create value correctly with deps", () => {
    let count = 0;
    const create = jest.fn(() => count++);
    const { result, rerender, unmount } = renderHook<DependencyList, number>(
      (deps) => useCreate(create, deps),
      { initialProps: [0] }
    );

    expect(create).toBeCalledTimes(1);
    expect(result.current).toBe(0);
    rerender([0]);
    expect(create).toBeCalledTimes(1);
    expect(result.current).toBe(0);
    rerender([1]);
    expect(create).toBeCalledTimes(2);
    expect(result.current).toBe(1);
    rerender([1]);
    expect(create).toBeCalledTimes(2);
    expect(result.current).toBe(1);
    rerender([2]);
    expect(create).toBeCalledTimes(3);
    expect(result.current).toBe(2);
    unmount();
    expect(create).toBeCalledTimes(3);
    expect(result.current).toBe(2);
  });
});
