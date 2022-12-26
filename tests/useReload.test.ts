import { useLoad, useReload } from "@lilib/hooks";
import { waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import renderHook from "./helpers/renderHook";

describe("useReload", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should reload correctly", async () => {
    const callback1 = jest.fn().mockImplementation(() => new Promise(() => {}));
    const callback2 = jest.fn().mockImplementation(() => new Promise(() => {}));

    const { result, unmount } = renderHook(() => {
      useLoad(callback1, [], { key: "reload-key", independent: true });
      useLoad(callback2, [], { key: "reload-key", independent: true });
      return useReload("reload-key");
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });
    await waitFor(() => Promise.resolve());
    expect(callback1).toBeCalledTimes(1);
    expect(callback2).toBeCalledTimes(1);

    act(() => {
      result.current();
    });
    act(() => {
      jest.runOnlyPendingTimers();
    });
    await waitFor(() => Promise.resolve());
    expect(callback1).toBeCalledTimes(2);
    expect(callback2).toBeCalledTimes(2);

    unmount();
  });

  it("support force option", async () => {
    let promise: Promise<any>;
    const callback = jest.fn().mockImplementation(
      () =>
        (promise = new Promise((resolve) => {
          setTimeout(() => {
            resolve("done");
          }, 1000);
        }))
    );
    const { result, rerender, unmount } = renderHook(
      ({ force }) => {
        useLoad(callback, [], {
          key: "force-reload-key",
          cacheKey: "cache-key",
          staleTime: 1000,
        });
        return useReload("force-reload-key", { force });
      },
      { initialProps: { force: false } }
    );

    act(() => {
      jest.runOnlyPendingTimers();
    });
    await waitFor(() => promise);
    expect(callback).toBeCalledTimes(1);

    act(() => {
      result.current();
    });
    act(() => {
      jest.runOnlyPendingTimers();
    });
    await waitFor(() => promise);
    expect(callback).toBeCalledTimes(1);

    act(() => {
      result.current({ force: true });
    });
    act(() => {
      jest.runOnlyPendingTimers();
    });
    await waitFor(() => promise);
    expect(callback).toBeCalledTimes(2);

    act(() => {
      result.current();
    });
    act(() => {
      jest.runOnlyPendingTimers();
    });
    await waitFor(() => promise);
    expect(callback).toBeCalledTimes(2);

    rerender({ force: true });
    act(() => {
      result.current();
    });
    act(() => {
      jest.runOnlyPendingTimers();
    });
    await waitFor(() => promise);
    expect(callback).toBeCalledTimes(3);

    unmount();
  });
});
