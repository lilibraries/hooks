import { useOnce } from "@lilib/hooks";
import renderHook from "./helpers/renderHook";

describe("useOnce", () => {
  it("should run effect synchronously only once", () => {
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
