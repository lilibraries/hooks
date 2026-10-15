import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useDarkMode from "../src/useDarkMode";

import { matchMediaMock, MockMediaQueryList, stubGlobal } from "./helpers/mocks";

describe("useDarkMode", () => {
  it("returns the prefers-color-scheme: dark match result initially", () => {
    const { result } = renderHook(() => useDarkMode());

    expect(result.current).toBe(false);
  });

  it("updates after the system toggles dark mode", () => {
    const { result } = renderHook(() => useDarkMode());

    act(() => {
      matchMediaMock.instances.at(-1)?.triggerChange(true);
    });
    expect(result.current).toBe(true);

    act(() => {
      matchMediaMock.instances.at(-1)?.triggerChange(false);
    });
    expect(result.current).toBe(false);
  });

  it("queries the prefers-color-scheme: dark media query", () => {
    renderHook(() => useDarkMode());

    expect(matchMediaMock.matchMedia).toHaveBeenCalledWith("(prefers-color-scheme: dark)");
  });

  it("returns true when the system initially prefers dark mode", () => {
    const instance = new MockMediaQueryList("(prefers-color-scheme: dark)", true);
    stubGlobal(
      "matchMedia",
      jest.fn(() => instance),
    );

    const { result } = renderHook(() => useDarkMode());

    expect(result.current).toBe(true);
  });

  it("stops responding to change events after unmount", () => {
    const { result, unmount } = renderHook(() => useDarkMode());

    unmount();

    act(() => {
      matchMediaMock.instances.at(-1)?.triggerChange(true);
    });

    expect(result.current).toBe(false);
  });
});
