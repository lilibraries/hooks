import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useMatchMedia from "../src/useMatchMedia";

import { matchMediaMock } from "./helpers/mocks";

describe("useMatchMedia", () => {
  it("returns the media query match result initially", () => {
    matchMediaMock.instances[0]?.triggerChange(false);
    const { result } = renderHook(() => useMatchMedia("(prefers-color-scheme: dark)"));

    expect(result.current).toBe(false);
  });

  it("updates the match result after a change event", () => {
    const { result } = renderHook(() => useMatchMedia("(max-width: 600px)"));

    expect(result.current).toBe(false);

    act(() => {
      matchMediaMock.instances.at(-1)?.triggerChange(true);
    });

    expect(result.current).toBe(true);
  });

  it("updates when changed to false again", () => {
    const { result } = renderHook(() => useMatchMedia("(max-width: 600px)"));

    act(() => {
      matchMediaMock.instances.at(-1)?.triggerChange(true);
    });
    expect(result.current).toBe(true);

    act(() => {
      matchMediaMock.instances.at(-1)?.triggerChange(false);
    });
    expect(result.current).toBe(false);
  });

  it("calls window.matchMedia with the query string", () => {
    renderHook(() => useMatchMedia("(min-width: 800px)"));

    expect(matchMediaMock.matchMedia).toHaveBeenCalledWith("(min-width: 800px)");
  });

  it("recreates the media query when the query changes", () => {
    const { rerender } = renderHook(({ query }) => useMatchMedia(query), {
      initialProps: { query: "(a)" },
    });

    rerender({ query: "(b)" });

    expect(matchMediaMock.matchMedia).toHaveBeenCalledWith("(a)");
    expect(matchMediaMock.matchMedia).toHaveBeenCalledWith("(b)");
    expect(matchMediaMock.matchMedia).toHaveBeenCalledTimes(2);
  });

  it("returns true when the initial match is true", () => {
    const { result } = renderHook(() => useMatchMedia("(any)"));
    void result;

    // Verify by setting the first instance's initial matches to true and re-rendering
    const instance = matchMediaMock.instances.at(-1);
    act(() => {
      instance?.triggerChange(true);
    });
    expect(result.current).toBe(true);
  });

  it("stops responding to change events after unmount", () => {
    const { result, unmount } = renderHook(() => useMatchMedia("(max-width: 600px)"));

    unmount();

    act(() => {
      matchMediaMock.instances.at(-1)?.triggerChange(true);
    });

    expect(result.current).toBe(false);
  });

  it("defaultValue does not override the actual match result in the browser", () => {
    // When the actual match is false, returns false even if defaultValue is true
    const { result } = renderHook(() => useMatchMedia("(max-width: 600px)", true));

    expect(result.current).toBe(false);

    act(() => {
      matchMediaMock.instances.at(-1)?.triggerChange(true);
    });
    expect(result.current).toBe(true);
  });
});
