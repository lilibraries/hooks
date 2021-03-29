import { useUnmount } from "@lilib/hooks";
import { renderHook } from "@testing-library/react-hooks";

describe("useUnmount", () => {
  it("should only run effect when the component will unmount", () => {
    const mock = jest.fn();
    const { rerender, unmount } = renderHook(() => useUnmount(mock));

    expect(mock).toBeCalledTimes(0);
    rerender();
    expect(mock).toBeCalledTimes(0);
    unmount();
    expect(mock).toBeCalledTimes(1);
  });

  it("should run lastest updated effect when the component will unmount", () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    const { rerender, unmount } = renderHook(
      (callback) => useUnmount(callback),
      { initialProps: mock1 }
    );

    expect(mock1).toBeCalledTimes(0);
    expect(mock2).toBeCalledTimes(0);
    rerender();
    expect(mock1).toBeCalledTimes(0);
    expect(mock2).toBeCalledTimes(0);
    rerender(mock2);
    expect(mock1).toBeCalledTimes(0);
    expect(mock2).toBeCalledTimes(0);
    rerender();
    expect(mock1).toBeCalledTimes(0);
    expect(mock2).toBeCalledTimes(0);
    unmount();
    expect(mock1).toBeCalledTimes(0);
    expect(mock2).toBeCalledTimes(1);
  });
});
