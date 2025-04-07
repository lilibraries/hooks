import { useSubmit } from "@lilib/hooks";
import { waitFor } from "@testing-library/react";
import act from "./helpers/act";
import renderHook from "./helpers/renderHook";

describe("useSubmit", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("return correct results", async () => {
    const callback = jest.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("done");
        }, 1000);
      });
    });

    const { result, unmount } = renderHook(() => useSubmit(callback));

    expect(result.current.submitting).toBe(false);
    expect(typeof result.current.submit).toBe("function");
    expect(callback).toBeCalledTimes(0);
    unmount();
  });

  it("retry correctly", async () => {
    let count = 0;
    let data: any;
    const callback = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (++count >= 6) {
            resolve("done");
          } else {
            reject(new Error("error"));
          }
        }, 1000);
      });
    });

    const { result, unmount } = renderHook(() =>
      useSubmit(callback, {
        fallback: callback,
        retry: true,
        fallbackRetry: true,
        onSuccess(d) {
          data = d;
        },
      })
    );

    act(() => {
      result.current.submit();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await waitFor(() => Promise.resolve());
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await waitFor(() => Promise.resolve());
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await waitFor(() => Promise.resolve());
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await waitFor(() => Promise.resolve());
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await waitFor(() => Promise.resolve());
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await waitFor(() => Promise.resolve());

    expect(callback).toBeCalledTimes(6);
    expect(data).toBe("done");

    unmount();
  });
});
