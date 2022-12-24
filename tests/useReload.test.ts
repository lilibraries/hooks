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

  it("should reload correctly", () => {
    const callback1 = jest.fn().mockImplementation(() => new Promise(() => {}));
    const callback2 = jest.fn().mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => {
      useLoad(callback1, [], { key: "reload-key", independent: true });
      useLoad(callback2, [], { key: "reload-key", independent: true });
      return useReload("reload-key");
    });

    expect(callback1).toBeCalledTimes(1);
    expect(callback2).toBeCalledTimes(1);

    act(() => {
      result.current();
    });

    expect(callback1).toBeCalledTimes(2);
    expect(callback2).toBeCalledTimes(2);
  });

  it("support force option", async () => {
    const callback = jest.fn().mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve("done");
          }, 1000);
        })
    );
    const { result, rerender } = renderHook(
      ({ force }) => {
        useLoad(callback, [], { key: "force-reload-key", staleTime: 1000 });
        return useReload("force-reload-key", { force });
      },
      { initialProps: { force: false } }
    );

    jest.runOnlyPendingTimers();
    await waitFor(() => {
      expect(callback).toBeCalledTimes(1);
    });

    act(() => {
      result.current();
    });
    jest.runOnlyPendingTimers();
    await waitFor(() => {
      expect(callback).toBeCalledTimes(1);
    });

    act(() => {
      result.current({ force: true });
    });
    jest.runOnlyPendingTimers();
    await waitFor(() => {
      expect(callback).toBeCalledTimes(2);
    });

    act(() => {
      result.current();
    });
    jest.runOnlyPendingTimers();
    await waitFor(() => {
      expect(callback).toBeCalledTimes(2);
    });

    rerender({ force: true });
    act(() => {
      result.current();
    });
    jest.runOnlyPendingTimers();
    await waitFor(() => {
      expect(callback).toBeCalledTimes(3);
    });
  });
});
