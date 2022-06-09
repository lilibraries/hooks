import { renderHook } from "@testing-library/react-hooks";
import { useOnce } from "@lilib/hooks";

describe("useOnce", () => {
  it("should run callback synchronously only once", () => {
    const mock = jest.fn();
    const { rerender, unmount } = renderHook(() => {
      useOnce(mock);
      expect(mock).toBeCalledTimes(1);
    });

    expect(mock).toBeCalledTimes(1);
    rerender();
    expect(mock).toBeCalledTimes(1);
    unmount();
    expect(mock).toBeCalledTimes(1);
  });
});
