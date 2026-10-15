import renderHook from "./helpers/renderHook";

import useComposedRef from "../src/useComposedRef";

describe("useComposedRef", () => {
  it("binds the element to both an object ref and a callback ref", () => {
    const objectRef = { current: null as HTMLDivElement | null };
    const callbackRef = jest.fn();
    const { result } = renderHook(() => useComposedRef<HTMLDivElement>(objectRef, callbackRef));

    const element = document.createElement("div");
    result.current(element);

    expect(objectRef.current).toBe(element);
    expect(callbackRef).toHaveBeenCalledWith(element);
  });

  it("clears all refs when null is passed", () => {
    const objectRef = { current: null as HTMLDivElement | null };
    const callbackRef = jest.fn();
    const { result } = renderHook(() => useComposedRef<HTMLDivElement>(objectRef, callbackRef));

    const element = document.createElement("div");
    result.current(element);
    result.current(null);

    expect(objectRef.current).toBeNull();
    expect(callbackRef).toHaveBeenLastCalledWith(null);
  });

  it("ignores null and undefined refs", () => {
    const callbackRef = jest.fn();
    const { result } = renderHook(() => useComposedRef<HTMLDivElement>(null, undefined, callbackRef));

    const element = document.createElement("div");
    expect(() => result.current(element)).not.toThrow();
    expect(callbackRef).toHaveBeenCalledWith(element);
  });

  it("updates all object refs when multiple are combined", () => {
    const refA = { current: null as HTMLDivElement | null };
    const refB = { current: null as HTMLDivElement | null };
    const { result } = renderHook(() => useComposedRef<HTMLDivElement>(refA, refB));

    const element = document.createElement("div");
    result.current(element);

    expect(refA.current).toBe(element);
    expect(refB.current).toBe(element);
  });

  it("callback identity is stable while the refs are stable", () => {
    const objectRef = { current: null as HTMLDivElement | null };
    const { result, rerender } = renderHook(() => useComposedRef<HTMLDivElement>(objectRef));

    const first = result.current;
    rerender();

    expect(result.current).toBe(first);
  });
});
