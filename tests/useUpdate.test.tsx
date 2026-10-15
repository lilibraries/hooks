import renderHook from "./helpers/renderHook";

import useUpdate from "../src/useUpdate";

describe("useUpdate", () => {
  it("does not run on the initial mount", () => {
    const effect = jest.fn();
    renderHook(() => useUpdate(effect, [1]));

    expect(effect).not.toHaveBeenCalled();
  });

  it("runs when the dependencies change", () => {
    const effect = jest.fn();
    const { rerender } = renderHook(({ dep }) => useUpdate(effect, [dep]), {
      initialProps: { dep: 1 },
    });

    rerender({ dep: 2 });
    expect(effect).toHaveBeenCalledTimes(1);

    rerender({ dep: 3 });
    expect(effect).toHaveBeenCalledTimes(2);
  });

  it("does not run on re-render when the dependencies are unchanged", () => {
    const effect = jest.fn();
    const { rerender } = renderHook(({ dep }) => useUpdate(effect, [dep]), {
      initialProps: { dep: 1 },
    });

    rerender({ dep: 1 });
    expect(effect).not.toHaveBeenCalled();
  });

  it("runs after every update when deps is omitted", () => {
    const effect = jest.fn();
    const { rerender } = renderHook(() => useUpdate(effect));

    expect(effect).not.toHaveBeenCalled();

    rerender();
    expect(effect).toHaveBeenCalledTimes(1);

    rerender();
    expect(effect).toHaveBeenCalledTimes(2);
  });

  it("never runs with an empty array", () => {
    const effect = jest.fn();
    const { rerender } = renderHook(() => useUpdate(effect, []));

    rerender();
    rerender();
    expect(effect).not.toHaveBeenCalled();
  });

  it("runs the previous cleanup first when the dependencies change", () => {
    const cleanup = jest.fn();
    const effect = jest.fn(() => cleanup);
    const { rerender } = renderHook(({ dep }) => useUpdate(effect, [dep]), {
      initialProps: { dep: 1 },
    });

    rerender({ dep: 2 });
    expect(effect).toHaveBeenCalledTimes(1);
    expect(cleanup).not.toHaveBeenCalled();

    rerender({ dep: 3 });
    expect(effect).toHaveBeenCalledTimes(2);
    expect(cleanup).toHaveBeenCalledTimes(1);
  });

  it("runs the last cleanup on unmount", () => {
    const cleanup = jest.fn();
    const effect = jest.fn(() => cleanup);
    const { unmount, rerender } = renderHook(({ dep }) => useUpdate(effect, [dep]), {
      initialProps: { dep: 1 },
    });

    rerender({ dep: 2 });
    unmount();
    expect(cleanup).toHaveBeenCalledTimes(1);
  });

  it("the first effect is still skipped on remount after unmount (Fast Refresh)", () => {
    const effect = jest.fn();
    const first = renderHook(() => useUpdate(effect));

    first.rerender();
    expect(effect).toHaveBeenCalledTimes(1);

    // Fully unmount, then mount a new instance
    first.unmount();
    const second = renderHook(() => useUpdate(effect));
    expect(effect).toHaveBeenCalledTimes(1);

    second.rerender();
    expect(effect).toHaveBeenCalledTimes(2);
  });
});
