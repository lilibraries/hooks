import renderHook from "./helpers/renderHook";

import useRefUpdate from "../src/useRefUpdate";

describe("useRefUpdate", () => {
  it("does not run on the initial mount", () => {
    const effect = jest.fn();
    renderHook(() => useRefUpdate(effect, [1]));

    expect(effect).not.toHaveBeenCalled();
  });

  it("runs when the dependencies change", () => {
    const effect = jest.fn();
    const { rerender } = renderHook(({ dep }) => useRefUpdate(effect, [dep]), {
      initialProps: { dep: 1 },
    });

    rerender({ dep: 2 });
    expect(effect).toHaveBeenCalledTimes(1);

    rerender({ dep: 3 });
    expect(effect).toHaveBeenCalledTimes(2);
  });

  it("does not run when the dependencies are unchanged", () => {
    const effect = jest.fn();
    const { rerender } = renderHook(({ dep }) => useRefUpdate(effect, [dep]), {
      initialProps: { dep: 1 },
    });

    rerender({ dep: 1 });
    expect(effect).not.toHaveBeenCalled();
  });

  it("ref deps are dereferenced: runs when ref.current changes", () => {
    const ref = { current: null as unknown as Element | null };
    const effect = jest.fn();
    const { rerender } = renderHook(() => useRefUpdate(effect, [ref]));

    expect(effect).not.toHaveBeenCalled();

    ref.current = document.createElement("div");
    rerender();
    expect(effect).toHaveBeenCalledTimes(1);

    rerender();
    expect(effect).toHaveBeenCalledTimes(1);
  });

  it("runs the previous cleanup first when the dependencies change", () => {
    const cleanup = jest.fn();
    const effect = jest.fn(() => cleanup);
    const { rerender } = renderHook(({ dep }) => useRefUpdate(effect, [dep]), {
      initialProps: { dep: 1 },
    });

    rerender({ dep: 2 });
    rerender({ dep: 3 });
    expect(cleanup).toHaveBeenCalledTimes(1);
  });

  it("runs the cleanup on unmount", () => {
    const cleanup = jest.fn();
    const effect = jest.fn(() => cleanup);
    const { unmount, rerender } = renderHook(({ dep }) => useRefUpdate(effect, [dep]), {
      initialProps: { dep: 1 },
    });

    rerender({ dep: 2 });
    unmount();
    expect(cleanup).toHaveBeenCalledTimes(1);
  });
});
