import { useEventListener } from "@lilib/hooks";
import { renderHook } from "@testing-library/react-hooks";

describe("useEventListener", () => {
  it("should accept null target", () => {
    renderHook(() => useEventListener(null, "nothing", () => {}));
  });

  it("should trigger event correctly", () => {
    const mock = jest.fn();
    const { unmount } = renderHook(() =>
      useEventListener(document.body, "click", mock)
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
