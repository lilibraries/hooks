import { StrictMode } from "react";
import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useMount from "../src/useMount";
import useRafState from "../src/useRafState";

function flushFrame() {
  act(() => {
    jest.advanceTimersByTime(16);
  });
}

describe("useRafState", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns the initial state", () => {
    const { result } = renderHook(() => useRafState(0));
    expect(result.current[0]).toBe(0);
  });

  it("supports the function form of the initial state", () => {
    const { result } = renderHook(() =>
      useRafState<number>(() => {
        return 10;
      }),
    );
    expect(result.current[0]).toBe(10);
  });

  it("state is undefined without an initial value", () => {
    const { result } = renderHook(() => useRafState());
    expect(result.current[0]).toBeUndefined();
  });

  it("does not update synchronously and never loses the first update", () => {
    const { result } = renderHook(() => useRafState(0));
    const [, setState] = result.current;

    act(() => setState(1));
    expect(result.current[0]).toBe(0);

    flushFrame();
    expect(result.current[0]).toBe(1);
  });

  it("merges the updates of each frame into a single render", () => {
    const renders = jest.fn();
    const { result } = renderHook(() => {
      renders();
      return useRafState(0);
    });

    for (let frame = 1; frame <= 3; frame += 1) {
      act(() => {
        result.current[1](frame * 10 + 1);
        result.current[1](frame * 10 + 2);
        result.current[1](frame * 10 + 3);
      });
      flushFrame();

      expect(result.current[0]).toBe(frame * 10 + 3);
      expect(renders).toHaveBeenCalledTimes(frame + 1);
    }
  });

  it("applies values and updaters in call order", () => {
    const { result } = renderHook(() => useRafState(1));

    act(() => {
      result.current[1]((previous) => previous + 1);
      result.current[1]((previous) => previous * 2);
    });
    flushFrame();
    expect(result.current[0]).toBe(4);

    act(() => {
      result.current[1]((previous) => previous + 1);
      result.current[1](10);
    });
    flushFrame();
    expect(result.current[0]).toBe(10);

    act(() => {
      result.current[1](10);
      result.current[1]((previous) => previous + 1);
    });
    flushFrame();
    expect(result.current[0]).toBe(11);
  });

  it("setState identity is stable across rerenders", () => {
    const { result, rerender } = renderHook(() => useRafState(0));
    const setState = result.current[1];

    rerender();
    expect(result.current[1]).toBe(setState);
  });

  it("drops the pending commit on unmount", () => {
    // The pending frame is cancelled by `useRaf` (covered by tests/useRaf.test.tsx); here we only
    // assert that a commit landing after unmount stays silent.
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const { result, unmount } = renderHook(() => useRafState(0));

    act(() => result.current[1](1));
    unmount();

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it("setState after unmount is a no-op without warnings", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const { result, unmount } = renderHook(() => useRafState(0));
    const setState = result.current[1];

    unmount();

    expect(() => {
      act(() => setState(1));
    }).not.toThrow();

    expect(jest.getTimerCount()).toBe(0);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it("applies each queued update once under StrictMode", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const { result } = renderHook(() => useRafState(1), { wrapper: StrictMode });

    act(() => {
      result.current[1]((previous) => previous + 1);
      result.current[1]((previous) => previous + 1);
    });
    flushFrame();

    expect(result.current[0]).toBe(3);
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it("keeps committing updates written in a mount effect under StrictMode", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const { result } = renderHook(
      () => {
        const [state, setState] = useRafState(0);
        useMount(() => setState(1));
        return [state, setState] as const;
      },
      { wrapper: StrictMode },
    );

    flushFrame();
    expect(result.current[0]).toBe(1);

    act(() => result.current[1](2));
    flushFrame();
    expect(result.current[0]).toBe(2);

    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
