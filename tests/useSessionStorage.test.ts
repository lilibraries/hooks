import { useSessionStorage } from "@lilib/hooks";
import { act, renderHook } from "@testing-library/react-hooks";

describe("useSessionStorage", () => {
  it("should return the same actions when the component rerenders", () => {
    const { result, rerender } = renderHook(() => useSessionStorage("key"));
    const [, actions1] = result.current;
    rerender();
    const [, actions2] = result.current;

    expect(actions1.set).toStrictEqual(actions2.set);
    expect(actions1.remove).toStrictEqual(actions2.remove);
  });

  it("should return default value correctly", () => {
    const { result, rerender } = renderHook<string | undefined, any>(
      (defaultValue) => useSessionStorage("key", defaultValue),
      { initialProps: undefined }
    );

    expect(result.current[0]).toBeUndefined();
    rerender("default");
    expect(result.current[0]).toBe("default");
  });

  it("should set and remove value correctly", () => {
    const { result } = renderHook(() => useSessionStorage("key", "default"));
    expect(sessionStorage.getItem("key")).toStrictEqual(null);

    act(() => result.current[1].set("value"));
    expect(result.current[0]).toBe("value");
    expect(sessionStorage.getItem("key")).toBe(JSON.stringify("value"));

    act(() => result.current[1].set("new value"));
    expect(result.current[0]).toBe("new value");
    expect(sessionStorage.getItem("key")).toBe(JSON.stringify("new value"));

    act(() => result.current[1].remove());
    expect(result.current[0]).toBe("default");
    expect(sessionStorage.getItem("key")).toStrictEqual(null);
  });

  it("should support custom serialize and deserialize function", () => {
    const { result } = renderHook(() =>
      useSessionStorage("key", "default", {
        serialize: (value) => value,
        deserialize: (raw) => raw,
      })
    );
    expect(sessionStorage.getItem("key")).toStrictEqual(null);

    act(() => result.current[1].set("value"));
    expect(result.current[0]).toBe("value");
    expect(sessionStorage.getItem("key")).toBe("value");

    act(() => result.current[1].set("new value"));
    expect(result.current[0]).toBe("new value");
    expect(sessionStorage.getItem("key")).toBe("new value");

    const { result: newResult } = renderHook(() =>
      useSessionStorage<string>("key", undefined, {
        serialize: (value) => value,
        deserialize: (raw) => raw,
      })
    );
    expect(newResult.current[0]).toBe("new value");
    expect(sessionStorage.getItem("key")).toBe("new value");

    act(() => newResult.current[1].remove());
    expect(newResult.current[0]).toBeUndefined();
    expect(sessionStorage.getItem("key")).toStrictEqual(null);
  });

  it("should retrieve storage value when the key changes", () => {
    sessionStorage.setItem("key1", JSON.stringify("value1"));
    sessionStorage.setItem("key2", JSON.stringify("value2"));

    const { result, rerender } = renderHook((key) => useSessionStorage(key), {
      initialProps: "key1",
    });
    expect(result.current[0]).toBe("value1");
    rerender("key2");
    expect(result.current[0]).toBe("value2");

    sessionStorage.removeItem("key1");
    sessionStorage.removeItem("key2");
  });

  it("should retrieve default value when the key changes", () => {
    const { result, rerender } = renderHook(
      ({ key, defaultValue }) => useSessionStorage(key, defaultValue),
      { initialProps: { key: "key", defaultValue: "default" } }
    );

    expect(result.current[0]).toBe("default");
    expect(sessionStorage.getItem("key")).toStrictEqual(null);
    rerender({ key: "new key", defaultValue: "new default" });
    expect(result.current[0]).toBe("new default");
    expect(sessionStorage.getItem("new key")).toStrictEqual(null);
  });
});
