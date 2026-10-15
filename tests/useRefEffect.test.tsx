import renderHook from "./helpers/renderHook";

import useRefEffect from "../src/useRefEffect";

describe("useRefEffect", () => {
  it("runs once on mount", () => {
    const effect = jest.fn();
    const { rerender } = renderHook(() => useRefEffect(effect, [1]));

    expect(effect).toHaveBeenCalledTimes(1);

    rerender();
    expect(effect).toHaveBeenCalledTimes(1);
  });

  it("cleans up first and then re-runs when the dependencies change", () => {
    const order: string[] = [];
    const { rerender } = renderHook(
      ({ dep }) => {
        return useRefEffect(() => {
          order.push(`effect-${dep}`);
          return () => {
            order.push(`cleanup-${dep}`);
          };
        }, [dep]);
      },
      {
        initialProps: { dep: 1 },
      },
    );

    rerender({ dep: 2 });
    rerender({ dep: 3 });

    expect(order).toEqual(["effect-1", "cleanup-1", "effect-2", "cleanup-2", "effect-3"]);
  });

  it("does not re-run when the dependencies are unchanged", () => {
    const effect = jest.fn();
    const { rerender } = renderHook(({ dep }) => useRefEffect(effect, [dep]), {
      initialProps: { dep: 1 },
    });

    rerender({ dep: 1 });
    expect(effect).toHaveBeenCalledTimes(1);
  });

  it("re-runs after every update when deps is omitted", () => {
    const effect = jest.fn();
    const { rerender } = renderHook(() => useRefEffect(effect));

    expect(effect).toHaveBeenCalledTimes(1);

    rerender();
    expect(effect).toHaveBeenCalledTimes(2);

    rerender();
    expect(effect).toHaveBeenCalledTimes(3);
  });

  it("runs only once on mount with an empty array", () => {
    const effect = jest.fn();
    const { rerender } = renderHook(() => useRefEffect(effect, []));

    rerender();
    rerender();
    expect(effect).toHaveBeenCalledTimes(1);
  });

  it("ref deps are dereferenced: re-runs when ref.current changes", () => {
    const ref = { current: null as unknown as Element | null };
    const effect = jest.fn();
    const { rerender } = renderHook(() => useRefEffect(effect, [ref]));

    expect(effect).toHaveBeenCalledTimes(1);

    // Update ref.current and trigger a re-render; the effect should re-run
    ref.current = document.createElement("div");
    rerender();
    expect(effect).toHaveBeenCalledTimes(2);

    rerender();
    expect(effect).toHaveBeenCalledTimes(2);
  });

  it("cleans up the previous effect first when a ref dep changes", () => {
    const ref = { current: null as unknown as Element | null };
    const cleanup = jest.fn();
    const effect = jest.fn(() => cleanup);
    const { rerender } = renderHook(() => useRefEffect(effect, [ref]));

    ref.current = document.createElement("div");
    rerender();

    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(effect).toHaveBeenCalledTimes(2);
  });

  it("runs the cleanup on unmount", () => {
    const cleanup = jest.fn();
    const { unmount } = renderHook(() => useRefEffect(() => cleanup, []));

    unmount();
    expect(cleanup).toHaveBeenCalledTimes(1);
  });

  it("cleans up the latest effect's return value on unmount", () => {
    const firstCleanup = jest.fn();
    const latestCleanup = jest.fn();
    const { unmount, rerender } = renderHook(
      ({ dep }) => {
        return useRefEffect(() => (dep === 1 ? firstCleanup : latestCleanup), [dep]);
      },
      {
        initialProps: { dep: 1 },
      },
    );

    rerender({ dep: 2 });
    expect(firstCleanup).toHaveBeenCalledTimes(1);

    unmount();
    expect(latestCleanup).toHaveBeenCalledTimes(1);
  });
});
