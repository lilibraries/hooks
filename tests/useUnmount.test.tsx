import renderHook from "./helpers/renderHook";

import useUnmount from "../src/useUnmount";

describe("useUnmount", () => {
  it("does not run while mounted", () => {
    const effect = jest.fn();
    const { rerender } = renderHook(() => useUnmount(effect));

    expect(effect).not.toHaveBeenCalled();

    rerender();
    expect(effect).not.toHaveBeenCalled();
  });

  it("runs once on unmount", () => {
    const effect = jest.fn();
    const { unmount } = renderHook(() => useUnmount(effect));

    unmount();
    expect(effect).toHaveBeenCalledTimes(1);
  });

  it("runs the latest effect on unmount", () => {
    const first = jest.fn();
    const { unmount, rerender } = renderHook(({ fn }) => useUnmount(fn), {
      initialProps: { fn: first },
    });

    const latest = jest.fn();
    rerender({ fn: latest });

    unmount();
    expect(first).not.toHaveBeenCalled();
    expect(latest).toHaveBeenCalledTimes(1);
  });
});
