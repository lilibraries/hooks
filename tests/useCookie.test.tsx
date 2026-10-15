import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useCookie from "../src/useCookie";

function clearCookies() {
  document.cookie.split(";").forEach((item) => {
    const name = item.split("=")[0]?.trim();
    if (name) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  });
}

describe("useCookie", () => {
  beforeEach(() => {
    clearCookies();
  });

  it("returns undefined when there is no cookie and no default value", () => {
    const { result } = renderHook(() => useCookie("token"));

    expect(result.current[0]).toBeUndefined();
  });

  it("reads an existing cookie", () => {
    document.cookie = "token=abc123";

    const { result } = renderHook(() => useCookie("token"));

    expect(result.current[0]).toBe("abc123");
  });

  it("returns the default value when there is no cookie", () => {
    const { result } = renderHook(() => useCookie("token", { defaultValue: "default-token" }));

    expect(result.current[0]).toBe("default-token");
  });

  it("setCookie writes the cookie and updates the state", () => {
    const { result } = renderHook(() => useCookie("token"));

    act(() => result.current[1]("new-token"));

    expect(result.current[0]).toBe("new-token");
    expect(document.cookie).toContain("token=new-token");
  });

  it("setCookie supports the function form (based on the old value)", () => {
    const { result } = renderHook(() => useCookie("count", { defaultValue: "1" }));

    act(() =>
      result.current[1]((prev) => {
        return `${Number(prev) + 1}`;
      }),
    );

    expect(result.current[0]).toBe("2");
    expect(document.cookie).toContain("count=2");
  });

  it("setCookie(undefined) removes the cookie and falls back to the default value", () => {
    document.cookie = "token=abc123";
    const { result } = renderHook(() => useCookie("token", { defaultValue: "fallback" }));

    expect(result.current[0]).toBe("abc123");

    act(() => result.current[1](undefined));

    expect(result.current[0]).toBe("fallback");
    expect(document.cookie).not.toContain("token=");
  });

  it("setCookie supports attributes", () => {
    const { result } = renderHook(() => useCookie("token"));

    act(() =>
      result.current[1]("value", {
        expires: 7,
        secure: true,
      }),
    );

    expect(document.cookie).toContain("token=value");
    expect(result.current[0]).toBe("value");
  });

  it("falls back to the default value when validation fails", () => {
    document.cookie = "count=invalid";
    const { result } = renderHook(() =>
      useCookie("count", {
        defaultValue: "0",
        validate: (value) => /^\d+$/.test(value),
      }),
    );

    expect(result.current[0]).toBe("0");
  });

  it("returns the original value when validation passes", () => {
    document.cookie = "count=42";
    const { result } = renderHook(() =>
      useCookie("count", {
        defaultValue: "0",
        validate: (value) => /^\d+$/.test(value),
      }),
    );

    expect(result.current[0]).toBe("42");
  });

  it("polling detects external cookie changes", () => {
    jest.useFakeTimers();
    const { result } = renderHook(() =>
      useCookie("token", {
        polling: true,
        pollingInterval: 100,
      }),
    );

    // Modify the cookie externally
    document.cookie = "token=external-change";
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current[0]).toBe("external-change");
    jest.useRealTimers();
  });

  it("does not detect external changes without polling", () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useCookie("token"));

    document.cookie = "token=external-change";
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current[0]).toBeUndefined();
    jest.useRealTimers();
  });

  it("setCookie identity is stable", () => {
    const { result, rerender } = renderHook(() => useCookie("token"));
    const setCookie = result.current[1];

    rerender();

    expect(result.current[1]).toBe(setCookie);
  });
});
