import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useLocalStorage from "../src/useLocalStorage";
import useSessionStorage from "../src/useSessionStorage";

describe("useSessionStorage", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("reads and writes sessionStorage", () => {
    const { result } = renderHook(() => useSessionStorage<number>("count"));

    act(() => result.current[1](10));

    expect(result.current[0]).toBe(10);
    expect(window.sessionStorage.getItem("count")).toBe("10");
  });

  it("returns undefined when there is no stored value and no default value", () => {
    const { result } = renderHook(() => useSessionStorage("key"));

    expect(result.current[0]).toBeUndefined();
  });

  it("reads the existing stored value (JSON deserialization)", () => {
    window.sessionStorage.setItem("count", "42");

    const { result } = renderHook(() => useSessionStorage<number>("count"));

    expect(result.current[0]).toBe(42);
  });

  it("reads object values", () => {
    window.sessionStorage.setItem("user", JSON.stringify({ name: "tom" }));

    const { result } = renderHook(() => useSessionStorage<{ name: string }>("user"));

    expect(result.current[0]).toEqual({ name: "tom" });
  });

  it("returns the default value when there is no stored value", () => {
    const { result } = renderHook(() => useSessionStorage("key", { defaultValue: "fallback" }));

    expect(result.current[0]).toBe("fallback");
  });

  it("setStorage supports object values", () => {
    const { result } = renderHook(() => useSessionStorage<{ id: number }>("user"));

    act(() => result.current[1]({ id: 1 }));

    expect(result.current[0]).toEqual({ id: 1 });
    expect(window.sessionStorage.getItem("user")).toBe('{"id":1}');
  });

  it("setStorage supports the function form", () => {
    const { result } = renderHook(() => useSessionStorage<number>("count", { defaultValue: 1 }));

    act(() => result.current[1]((prev) => (prev ?? 0) + 1));

    expect(result.current[0]).toBe(2);
    expect(window.sessionStorage.getItem("count")).toBe("2");
  });

  it("re-reads when the key changes", () => {
    window.sessionStorage.setItem("a", "1");
    window.sessionStorage.setItem("b", "2");

    const { result, rerender } = renderHook(({ key }) => useSessionStorage(key), {
      initialProps: { key: "a" },
    });

    expect(result.current[0]).toBe(1);

    rerender({ key: "b" });
    expect(result.current[0]).toBe(2);
  });

  it("falls back to the default value when validation fails", () => {
    window.sessionStorage.setItem("count", JSON.stringify("not-a-number"));
    const { result } = renderHook(() =>
      useSessionStorage("count", {
        defaultValue: 0,
        validate: (value) => typeof value === "number",
      }),
    );

    expect(result.current[0]).toBe(0);
  });

  it("custom serialize/deserialize", () => {
    const { result } = renderHook(() =>
      useSessionStorage<string>("key", {
        defaultValue: "a,b",
        serialize: (value) => value.split(",").join("|"),
        deserialize: (raw) => raw.split("|").join(","),
      }),
    );

    expect(result.current[0]).toBe("a,b");
    expect(window.sessionStorage.getItem("key")).toBeNull(); // the default value is not written

    act(() => result.current[1]("x,y"));
    expect(window.sessionStorage.getItem("key")).toBe("x|y");
  });

  it("syncs state on the storage event (modified by another tab)", () => {
    const { result } = renderHook(() => useSessionStorage<number>("count"));

    act(() => {
      window.sessionStorage.setItem("count", "99");
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "count",
          storageArea: window.sessionStorage,
        }),
      );
    });

    expect(result.current[0]).toBe(99);
  });

  it("polling detects external changes", () => {
    jest.useFakeTimers();
    const { result } = renderHook(() =>
      useSessionStorage<number>("count", {
        polling: true,
        pollingInterval: 100,
      }),
    );

    window.sessionStorage.setItem("count", "7");
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current[0]).toBe(7);
    jest.useRealTimers();
  });

  it("setStorage identity is stable", () => {
    const { result, rerender } = renderHook(() => useSessionStorage("key"));
    const setStorage = result.current[1];

    rerender();

    expect(result.current[1]).toBe(setStorage);
  });

  it("is independent of localStorage", () => {
    window.localStorage.setItem("key", JSON.stringify("local"));
    window.sessionStorage.setItem("key", JSON.stringify("session"));

    const local = renderHook(() => useLocalStorage("key"));
    const session = renderHook(() => useSessionStorage("key"));

    expect(local.result.current[0]).toBe("local");
    expect(session.result.current[0]).toBe("session");

    local.unmount();
    session.unmount();
  });

  it("removes the stored value", () => {
    window.sessionStorage.setItem("key", JSON.stringify("value"));
    const { result } = renderHook(() => useSessionStorage("key", { defaultValue: "default" }));

    expect(result.current[0]).toBe("value");

    act(() => result.current[1](undefined));

    expect(result.current[0]).toBe("default");
    expect(window.sessionStorage.getItem("key")).toBeNull();
  });
});
