import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useWindowFocus from "../src/useWindowFocus";

describe("useWindowFocus", () => {
  it("initial value is document.hasFocus()", () => {
    const { result } = renderHook(() => useWindowFocus());
    expect(result.current).toBe(document.hasFocus());
  });

  it("returns false after the blur event", () => {
    const { result } = renderHook(() => useWindowFocus());

    act(() => {
      window.dispatchEvent(new Event("blur"));
    });

    expect(result.current).toBe(false);
  });

  it("returns true after the focus event", () => {
    const { result } = renderHook(() => useWindowFocus());

    act(() => {
      window.dispatchEvent(new Event("blur"));
    });
    expect(result.current).toBe(false);

    act(() => {
      window.dispatchEvent(new Event("focus"));
    });
    expect(result.current).toBe(true);
  });

  it("toggles state multiple times", () => {
    const { result } = renderHook(() => useWindowFocus());

    act(() => {
      window.dispatchEvent(new Event("blur"));
    });
    expect(result.current).toBe(false);

    act(() => {
      window.dispatchEvent(new Event("focus"));
    });
    expect(result.current).toBe(true);

    act(() => {
      window.dispatchEvent(new Event("blur"));
    });
    expect(result.current).toBe(false);
  });

  it("stops responding to events after unmount", () => {
    const { result, unmount } = renderHook(() => useWindowFocus());
    const initial = result.current;

    unmount();

    act(() => {
      window.dispatchEvent(new Event("blur"));
    });

    expect(result.current).toBe(initial);
  });
});
