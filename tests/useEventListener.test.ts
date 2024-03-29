import { useEventListener } from "@lilib/hooks";
import renderHook from "./helpers/renderHook";

describe("useEventListener", () => {
  it("should trigger event correctly", () => {
    const mock = jest.fn();
    const { unmount } = renderHook(() =>
      useEventListener(() => document.body, "click", mock)
    );

    document.body.click();
    expect(mock).toBeCalledTimes(1);
    document.body.click();
    expect(mock).toBeCalledTimes(2);
    unmount();
    document.body.click();
    expect(mock).toBeCalledTimes(2);
  });
});
