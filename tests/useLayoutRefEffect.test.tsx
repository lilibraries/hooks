import renderHook from "./helpers/renderHook";

import useLayoutRefEffect from "../src/useLayoutRefEffect";

describe("useLayoutRefEffect", () => {
  it("runs on mount (layout phase) and re-runs on dependency changes", () => {
    const effect = jest.fn();
    const { rerender } = renderHook(({ dep }) => useLayoutRefEffect(effect, [dep]), {
      initialProps: { dep: 1 },
    });

    expect(effect).toHaveBeenCalledTimes(1);

    rerender({ dep: 2 });
    expect(effect).toHaveBeenCalledTimes(2);
  });

  it("re-runs when ref.current changes", () => {
    const ref = { current: null as unknown as Element | null };
    const effect = jest.fn();
    const { rerender } = renderHook(() => useLayoutRefEffect(effect, [ref]));

    ref.current = document.createElement("div");
    rerender();

    expect(effect).toHaveBeenCalledTimes(2);
  });

  it("cleans up first and then re-runs when the dependencies change", () => {
    const order: string[] = [];
    const { rerender } = renderHook(
      ({ dep }) => {
        return useLayoutRefEffect(() => {
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
    const { rerender } = renderHook(({ dep }) => useLayoutRefEffect(effect, [dep]), {
      initialProps: { dep: 1 },
    });

    rerender({ dep: 1 });
    expect(effect).toHaveBeenCalledTimes(1);
  });

  it("re-runs after every update when deps is omitted", () => {
    const effect = jest.fn();
    const { rerender } = renderHook(() => useLayoutRefEffect(effect));

    expect(effect).toHaveBeenCalledTimes(1);

    rerender();
    expect(effect).toHaveBeenCalledTimes(2);

    rerender();
    expect(effect).toHaveBeenCalledTimes(3);
  });

  it("cleans up the latest effect's return value on unmount", () => {
    const firstCleanup = jest.fn();
    const latestCleanup = jest.fn();
    const { unmount, rerender } = renderHook(
      ({ dep }) => {
        return useLayoutRefEffect(() => (dep === 1 ? firstCleanup : latestCleanup), [dep]);
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

  it("runs the cleanup on unmount", () => {
    const cleanup = jest.fn();
    const { unmount } = renderHook(() => useLayoutRefEffect(() => cleanup, []));

    unmount();
    expect(cleanup).toHaveBeenCalledTimes(1);
  });
});
