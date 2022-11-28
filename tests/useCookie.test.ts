import Cookies from "js-cookie";
import { useCookie } from "@lilib/hooks";
import { act } from "react-dom/test-utils";
import renderHook from "./helpers/renderHook";

describe("useCookie", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should return the same `setCookie` function when the component is rerendered", () => {
    const { result, rerender } = renderHook(() => useCookie("name"));
    const [, setCookie1] = result.current;
    rerender();
    const [, setCookie12] = result.current;

    expect(setCookie1).toStrictEqual(setCookie12);
  });

  it("should return default value correctly", () => {
    const { result, rerender } = renderHook<string | undefined, any>(
      (defaultValue) => useCookie("name", { defaultValue }),
      { initialProps: undefined }
    );

    expect(result.current[0]).toBeUndefined();

    rerender("default");
    expect(result.current[0]).toBe("default");
  });

  it("should return correct coookie value when it exists", () => {
    Cookies.set("name", "value");

    const { result } = renderHook(() =>
      useCookie("name", { defaultValue: "default" })
    );

    expect(result.current[0]).toBe("value");

    Cookies.remove("name");
  });

  it("should set and remove cookie correctly", () => {
    const { result } = renderHook(() => useCookie("name"));

    expect(result.current[0]).toBeUndefined();

    act(() => result.current[1]("value"));
    expect(result.current[0]).toBe("value");
    expect(Cookies.get("name")).toBe("value");

    act(() => result.current[1](undefined));
    expect(result.current[0]).toBeUndefined();
    expect(Cookies.get("name")).toBeUndefined();
  });

  it("should refresh `defaultValue` when name changes", () => {
    const { result, rerender } = renderHook(
      ({ name, defaultValue }) => useCookie(name, { defaultValue }),
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

  it("should auto update value when the `polling` options is `true`", () => {
    const { result, rerender } = renderHook<
      { polling?: boolean; pollingInterval?: number },
      ReturnType<typeof useCookie>
    >((props) => useCookie("name", props), {
      initialProps: {
        polling: undefined,
        pollingInterval: undefined,
      },
    });

    expect(result.current[0]).toBeUndefined();

    Cookies.set("name", "value");
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current[0]).toBeUndefined();

    rerender({ polling: true });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current[0]).toBe("value");

    rerender({ polling: true, pollingInterval: 200 });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current[0]).toBe("value");
    Cookies.set("name", "new value");
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current[0]).toBe("value");
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current[0]).toBe("new value");

    Cookies.remove("name");
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current[0]).toBeUndefined();

    rerender({ polling: false, pollingInterval: 200 });
    jest.runOnlyPendingTimers();
    Cookies.set("name", "new value 2");
    expect(result.current[0]).toBeUndefined();
    Cookies.remove("name");
  });

  it("supports `validate` option", () => {
    const returnTrue = () => true;
    const returnFalse = () => false;
    Cookies.set("name", "value");

    const { result, rerender, unmount } = renderHook(
      ({ validate }) =>
        useCookie("name", {
          defaultValue: "default",
          polling: true,
          pollingInterval: 10,
          validate,
        }),
      { initialProps: { validate: returnTrue } }
    );
    expect(result.current[0]).toBe("value");

    Cookies.set("name", "value1");
    act(() => {
      jest.advanceTimersByTime(10);
    });
    expect(result.current[0]).toBe("value1");

    rerender({ validate: returnFalse });
    Cookies.set("name", "value2");
    act(() => {
      jest.advanceTimersByTime(10);
    });
    expect(result.current[0]).toBe("default");

    unmount();
  });
});
