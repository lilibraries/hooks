import renderHook from "./helpers/renderHook";

import useLayoutRefUpdate from "../src/useLayoutRefUpdate";

describe("useLayoutRefUpdate", () => {
  it("does not run on mount, runs on dependency changes (layout phase)", () => {
    const effect = jest.fn();
    const { rerender } = renderHook(({ dep }) => useLayoutRefUpdate(effect, [dep]), {
      initialProps: { dep: 1 },
    });

    expect(effect).not.toHaveBeenCalled();

    rerender({ dep: 2 });
    expect(effect).toHaveBeenCalledTimes(1);
  });

  it("runs when ref.current changes", () => {
    const ref = { current: null as unknown as Element | null };
    const effect = jest.fn();
    const { rerender } = renderHook(() => useLayoutRefUpdate(effect, [ref]));

    ref.current = document.createElement("div");
    rerender();

    expect(effect).toHaveBeenCalledTimes(1);
  });

  it("does not run when the dependencies are unchanged", () => {
    const effect = jest.fn();
    const { rerender } = renderHook(({ dep }) => useLayoutRefUpdate(effect, [dep]), {
      initialProps: { dep: 1 },
    });

    rerender({ dep: 1 });
    expect(effect).not.toHaveBeenCalled();
  });

  it("runs the previous cleanup first when the dependencies change", () => {
    const cleanup = jest.fn();
    const effect = jest.fn(() => cleanup);
    const { rerender } = renderHook(({ dep }) => useLayoutRefUpdate(effect, [dep]), {
      initialProps: { dep: 1 },
    });

    rerender({ dep: 2 });
    expect(effect).toHaveBeenCalledTimes(1);
    expect(cleanup).not.toHaveBeenCalled();

    rerender({ dep: 3 });
    expect(effect).toHaveBeenCalledTimes(2);
    expect(cleanup).toHaveBeenCalledTimes(1);
  });

  it("runs the cleanup on unmount", () => {
    const cleanup = jest.fn();
    const effect = jest.fn(() => cleanup);
    const { unmount, rerender } = renderHook(({ dep }) => useLayoutRefUpdate(effect, [dep]), {
      initialProps: { dep: 1 },
    });

    rerender({ dep: 2 });
    unmount();
    expect(cleanup).toHaveBeenCalledTimes(1);
  });
});
