import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useLocalStorage from "../src/useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns undefined when there is no stored value and no default value", () => {
    const { result } = renderHook(() => useLocalStorage("key"));

    expect(result.current[0]).toBeUndefined();
  });

  it("reads the existing stored value (JSON deserialization)", () => {
    window.localStorage.setItem("count", "42");

    const { result } = renderHook(() => useLocalStorage<number>("count"));

    expect(result.current[0]).toBe(42);
  });

  it("reads object values", () => {
    window.localStorage.setItem("user", JSON.stringify({ name: "tom" }));

    const { result } = renderHook(() => useLocalStorage<{ name: string }>("user"));

    expect(result.current[0]).toEqual({ name: "tom" });
  });

  it("returns the default value when there is no stored value", () => {
    const { result } = renderHook(() => useLocalStorage("key", { defaultValue: "fallback" }));

    expect(result.current[0]).toBe("fallback");
  });

  it("setStorage writes to storage and updates the state", () => {
    const { result } = renderHook(() => useLocalStorage<number>("count"));

    act(() => result.current[1](42));

    expect(result.current[0]).toBe(42);
    expect(window.localStorage.getItem("count")).toBe("42");
  });

  it("setStorage supports object values", () => {
    const { result } = renderHook(() => useLocalStorage<{ id: number }>("user"));

    act(() => result.current[1]({ id: 1 }));

    expect(result.current[0]).toEqual({ id: 1 });
    expect(window.localStorage.getItem("user")).toBe('{"id":1}');
  });

  it("setStorage supports the function form", () => {
    const { result } = renderHook(() => useLocalStorage<number>("count", { defaultValue: 1 }));

    act(() => result.current[1]((prev) => (prev ?? 0) + 1));

    expect(result.current[0]).toBe(2);
    expect(window.localStorage.getItem("count")).toBe("2");
  });

  it("setStorage(undefined) removes the stored value and falls back to the default value", () => {
    window.localStorage.setItem("count", "42");
    const { result } = renderHook(() => useLocalStorage<number>("count", { defaultValue: 0 }));

    expect(result.current[0]).toBe(42);

    act(() => result.current[1](undefined));

    expect(result.current[0]).toBe(0);
    expect(window.localStorage.getItem("count")).toBeNull();
  });

  it("re-reads when the key changes", () => {
    window.localStorage.setItem("a", "1");
    window.localStorage.setItem("b", "2");

    const { result, rerender } = renderHook(({ key }) => useLocalStorage(key), {
      initialProps: { key: "a" },
    });

    expect(result.current[0]).toBe(1);

    rerender({ key: "b" });
    expect(result.current[0]).toBe(2);
  });

  it("falls back to the default value when validation fails", () => {
    // The hook intentionally reports the deserialization failure via `console.error`;
    // silence it so the expected error path does not pollute the test log.
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    window.localStorage.setItem("count", "invalid");
    const { result } = renderHook(() =>
      useLocalStorage("count", {
        defaultValue: "0",
        validate: (value) => typeof value === "number",
      }),
    );

    expect(result.current[0]).toBe("0");
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it("custom serialize/deserialize", () => {
    const { result } = renderHook(() =>
      useLocalStorage<string>("key", {
        defaultValue: "a,b",
        serialize: (value) => value.split(",").join("|"),
        deserialize: (raw) => raw.split("|").join(","),
      }),
    );

    expect(result.current[0]).toBe("a,b");
    expect(window.localStorage.getItem("key")).toBeNull(); // the default value is not written

    act(() => result.current[1]("x,y"));
    expect(window.localStorage.getItem("key")).toBe("x|y");
  });

  it("syncs state on the storage event (modified by another tab)", () => {
    const { result } = renderHook(() => useLocalStorage<number>("count"));

    act(() => {
      window.localStorage.setItem("count", "99");
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "count",
          storageArea: window.localStorage,
        }),
      );
    });

    expect(result.current[0]).toBe(99);
  });

  it("polling detects external changes", () => {
    jest.useFakeTimers();
    const { result } = renderHook(() =>
      useLocalStorage<number>("count", { polling: true, pollingInterval: 100 }),
    );

    window.localStorage.setItem("count", "7");
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current[0]).toBe(7);
    jest.useRealTimers();
  });

  it("setStorage identity is stable", () => {
    const { result, rerender } = renderHook(() => useLocalStorage("key"));
    const setStorage = result.current[1];

    rerender();

    expect(result.current[1]).toBe(setStorage);
  });
});
