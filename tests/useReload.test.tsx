import { act, waitFor } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useLoad from "../src/useLoad";
import useReload from "../src/useReload";

describe("useReload", () => {
  it("reloads all useLoad instances with the same key", async () => {
    const callbackA = jest.fn(async () => "data-a");
    const callbackB = jest.fn(async () => "data-b");

    // independent makes the two instances request separately, so each being triggered is easy to observe
    const first = renderHook(() => useLoad(callbackA, [], { key: "shared", independent: true }));
    const second = renderHook(() => useLoad(callbackB, [], { key: "shared", independent: true }));
    const reloader = renderHook(() => useReload("shared"));

    await waitFor(() => expect(first.result.current.data).toBe("data-a"));
    await waitFor(() => expect(second.result.current.data).toBe("data-b"));
    expect(callbackA).toHaveBeenCalledTimes(1);
    expect(callbackB).toHaveBeenCalledTimes(1);

    await act(async () => {
      reloader.result.current();
      await Promise.resolve();
    });

    await waitFor(() => expect(callbackA).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(callbackB).toHaveBeenCalledTimes(2));

    first.unmount();
    second.unmount();
    reloader.unmount();
  });

  it("non-independent instances with the same key share results, and reload still triggers them all", async () => {
    const callbackA = jest.fn(async () => "data-a");
    const callbackB = jest.fn(async () => "data-b");

    const first = renderHook(() => useLoad(callbackA, [], { key: "shared" }));
    const second = renderHook(() => useLoad(callbackB, [], { key: "shared" }));
    const reloader = renderHook(() => useReload("shared"));

    // The two instances merge requests, so the data is identical
    await waitFor(() => expect(first.result.current.data).toBe("data-a"));
    await waitFor(() => expect(second.result.current.data).toBe("data-a"));
    expect(callbackA).toHaveBeenCalledTimes(1);
    expect(callbackB).not.toHaveBeenCalled();

    await act(async () => {
      reloader.result.current();
      await Promise.resolve();
    });

    await waitFor(() => expect(callbackA).toHaveBeenCalledTimes(2));
    expect(callbackB).not.toHaveBeenCalled();

    first.unmount();
    second.unmount();
    reloader.unmount();
  });

  it("triggers only instances with the matching key", async () => {
    const callbackA = jest.fn(async () => "data-a");
    const callbackB = jest.fn(async () => "data-b");

    const first = renderHook(() => useLoad(callbackA, [], { key: "a" }));
    const second = renderHook(() => useLoad(callbackB, [], { key: "b" }));
    const reloader = renderHook(() => useReload("a"));

    await waitFor(() => expect(first.result.current.data).toBe("data-a"));
    await waitFor(() => expect(second.result.current.data).toBe("data-b"));

    await act(async () => {
      reloader.result.current();
      await Promise.resolve();
    });

    await waitFor(() => expect(callbackA).toHaveBeenCalledTimes(2));
    expect(callbackB).toHaveBeenCalledTimes(1);

    first.unmount();
    second.unmount();
    reloader.unmount();
  });

  it("the returned reload function identity is stable", () => {
    const { result, rerender } = renderHook(() => useReload("key"));
    const reload = result.current;

    rerender();

    expect(result.current).toBe(reload);
  });
});
