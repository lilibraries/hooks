import Cookies from "js-cookie";
import { useCookie } from "@lilib/hooks";
import { act, renderHook } from "@testing-library/react-hooks";

describe("useCookie", () => {
  it("should return the same actions when the component rerenders", () => {
    const { result, rerender } = renderHook(() => useCookie("name"));
    const [, actions1] = result.current;
    rerender();
    const [, actions2] = result.current;

    expect(actions1.set).toStrictEqual(actions2.set);
    expect(actions1.remove).toStrictEqual(actions2.remove);
  });

  it("should return default value correctly", () => {
    const { result, rerender } = renderHook<string | undefined, any>(
      (defaultValue) => useCookie("name", defaultValue),
      { initialProps: undefined }
    );

    expect(result.current[0]).toBeUndefined();
    rerender("default");
    expect(result.current[0]).toBe("default");
  });

  it("should return correct coookie value when it exists", () => {
    Cookies.set("name", "value");
    const { result } = renderHook(() => useCookie("name", "default"));
    expect(result.current[0]).toBe("value");
    Cookies.remove("name");
  });

  it("should set and remove cookie correctly", () => {
    const { result } = renderHook(() =>
      useCookie("name", undefined, { path: "" })
    );
    expect(result.current[0]).toBeUndefined();

    act(() => result.current[1].set("value"));
    expect(result.current[0]).toBe("value");
    expect(Cookies.get("name")).toBe("value");

    act(() => result.current[1].remove());
    expect(result.current[0]).toBeUndefined();
    expect(Cookies.get("name")).toBeUndefined();

    act(() => result.current[1].set("value"));
    expect(result.current[0]).toBe("value");
    expect(Cookies.get("name")).toBe("value");

    act(() => result.current[1].remove());
    expect(result.current[0]).toBeUndefined();
    expect(Cookies.get("name")).toBeUndefined();
  });

  it("should refresh `defaultValue` when name changes", () => {
    const { result, rerender } = renderHook(
      ({ name, defaultValue }) => useCookie(name, defaultValue),
      { initialProps: { name: "name1", defaultValue: "defaultValue1" } }
    );

    expect(Cookies.get("name1")).toBeUndefined();
    expect(result.current[0]).toBe("defaultValue1");
    rerender({ name: "name2", defaultValue: "defaultValue2" });
    expect(Cookies.get("name2")).toBeUndefined();
    expect(result.current[0]).toBe("defaultValue2");
  });

  it("should refresh cookie value when the name changes", () => {
    Cookies.set("name1", "value1");
    Cookies.set("name2", "value2");

    const { result, rerender } = renderHook((name) => useCookie(name), {
      initialProps: "name1",
    });

    expect(result.current[0]).toBe("value1");
    rerender("name2");
    expect(result.current[0]).toBe("value2");

    Cookies.remove("name1");
    Cookies.remove("name2");
  });
});
