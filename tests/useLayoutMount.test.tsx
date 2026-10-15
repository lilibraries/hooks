import renderHook from "./helpers/renderHook";

import useLayoutMount from "../src/useLayoutMount";

describe("useLayoutMount", () => {
  it("runs once on mount (layout phase)", () => {
    const effect = jest.fn();
    const { rerender } = renderHook(() => useLayoutMount(effect));

    expect(effect).toHaveBeenCalledTimes(1);

    rerender();
    expect(effect).toHaveBeenCalledTimes(1);
  });

  it("does not run again on re-render after the effect changes", () => {
    const effect = jest.fn();
    const { rerender } = renderHook(({ fn }) => useLayoutMount(fn), {
      initialProps: { fn: effect },
    });

    const newEffect = jest.fn();
    rerender({ fn: newEffect });

    expect(effect).toHaveBeenCalledTimes(1);
    expect(newEffect).not.toHaveBeenCalled();
  });

  it("runs the cleanup on unmount", () => {
    const cleanup = jest.fn();
    const { unmount } = renderHook(() => useLayoutMount(() => cleanup));

    unmount();
    expect(cleanup).toHaveBeenCalledTimes(1);
  });
});
