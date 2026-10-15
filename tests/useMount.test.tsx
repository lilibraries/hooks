import renderHook from "./helpers/renderHook";

import useMount from "../src/useMount";

describe("useMount", () => {
  it("runs once on mount", () => {
    const effect = jest.fn();
    const { rerender } = renderHook(() => useMount(effect));

    expect(effect).toHaveBeenCalledTimes(1);

    rerender();
    rerender();
    expect(effect).toHaveBeenCalledTimes(1);
  });

  it("does not run again on re-render after the effect changes", () => {
    const effect = jest.fn();
    const { rerender } = renderHook(({ fn }) => useMount(fn), {
      initialProps: { fn: effect },
    });

    const newEffect = jest.fn();
    rerender({ fn: newEffect });

    expect(effect).toHaveBeenCalledTimes(1);
    expect(newEffect).not.toHaveBeenCalled();
  });

  it("runs the cleanup returned by the effect on unmount", () => {
    const cleanup = jest.fn();
    const effect = jest.fn(() => cleanup);
    const { unmount } = renderHook(() => useMount(effect));

    expect(cleanup).not.toHaveBeenCalled();

    unmount();
    expect(cleanup).toHaveBeenCalledTimes(1);
  });
});
