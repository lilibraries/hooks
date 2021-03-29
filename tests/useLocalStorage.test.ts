import { useLocalStorage } from "@lilib/hooks";
import { act, renderHook } from "@testing-library/react-hooks";

describe("useLocalStorage", () => {
  it("should return the same actions when the component rerenders", () => {
    const { result, rerender } = renderHook(() => useLocalStorage("key"));
    const [, actions1] = result.current;
    rerender();
    const [, actions2] = result.current;

    expect(actions1.set).toStrictEqual(actions2.set);
    expect(actions1.remove).toStrictEqual(actions2.remove);
  });

  it("should return default value correctly", () => {
    const { result, rerender } = renderHook<string | undefined, any>(
      (defaultValue) => useLocalStorage("key", defaultValue),
      { initialProps: undefined }
    );

    expect(result.current[0]).toBeUndefined();
    rerender("default");
    expect(result.current[0]).toBe("default");
  });

  it("should set and remove value correctly", () => {
    const { result } = renderHook(() => useLocalStorage("key", "default"));
    expect(localStorage.getItem("key")).toStrictEqual(null);

    act(() => result.current[1].set("value"));
    expect(result.current[0]).toBe("value");
    expect(localStorage.getItem("key")).toBe(JSON.stringify("value"));

    act(() => result.current[1].set("new value"));
    expect(result.current[0]).toBe("new value");
    expect(localStorage.getItem("key")).toBe(JSON.stringify("new value"));

    act(() => result.current[1].remove());
    expect(result.current[0]).toBe("default");
    expect(localStorage.getItem("key")).toStrictEqual(null);
  });

  it("should support custom serialize and deserialize function", () => {
    const { result } = renderHook(() =>
      useLocalStorage("key", "default", {
        serialize: (value) => value,
        deserialize: (raw) => raw,
      })
    );
    expect(localStorage.getItem("key")).toStrictEqual(null);

    act(() => result.current[1].set("value"));
    expect(result.current[0]).toBe("value");
    expect(localStorage.getItem("key")).toBe("value");

    act(() => result.current[1].set("new value"));
    expect(result.current[0]).toBe("new value");
    expect(localStorage.getItem("key")).toBe("new value");

    const { result: newResult } = renderHook(() =>
      useLocalStorage<string>("key", undefined, {
        serialize: (value) => value,
        deserialize: (raw) => raw,
      })
    );
    expect(newResult.current[0]).toBe("new value");
    expect(localStorage.getItem("key")).toBe("new value");

    act(() => newResult.current[1].remove());
    expect(newResult.current[0]).toBeUndefined();
    expect(localStorage.getItem("key")).toStrictEqual(null);
  });

  it("should retrieve storage value when the key changes", () => {
    localStorage.setItem("key1", JSON.stringify("value1"));
    localStorage.setItem("key2", JSON.stringify("value2"));

    const { result, rerender } = renderHook((key) => useLocalStorage(key), {
      initialProps: "key1",
    });
    expect(result.current[0]).toBe("value1");
    rerender("key2");
    expect(result.current[0]).toBe("value2");

    localStorage.removeItem("key1");
    localStorage.removeItem("key2");
  });

  it("should retrieve default value when the key changes", () => {
    const { result, rerender } = renderHook(
      ({ key, defaultValue }) => useLocalStorage(key, defaultValue),
      { initialProps: { key: "key", defaultValue: "default" } }
    );

    expect(result.current[0]).toBe("default");
    expect(localStorage.getItem("key")).toStrictEqual(null);
    rerender({ key: "new key", defaultValue: "new default" });
    expect(result.current[0]).toBe("new default");
    expect(localStorage.getItem("new key")).toStrictEqual(null);
  });
});
