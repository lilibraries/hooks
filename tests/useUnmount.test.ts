import { useUnmount } from "@lilib/hooks";
import renderHook from "./helpers/renderHook";

describe("useUnmount", () => {
  it("should only run effect when the component will unmount", () => {
    const mock = jest.fn();
    const { rerender, unmount } = renderHook(() => useUnmount(mock));

    expect(mock).not.toBeCalled();

    rerender();
    expect(mock).not.toBeCalled();

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

    expect(mock1).not.toBeCalled();
    expect(mock2).not.toBeCalled();

    rerender(mock2);
    expect(mock1).not.toBeCalled();
    expect(mock2).not.toBeCalled();

    unmount();
    expect(mock1).not.toBeCalled();
    expect(mock2).toBeCalledTimes(1);
  });
});
