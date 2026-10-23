import React, { StrictMode, type ReactNode, type Ref } from "react";

import renderHook from "./helpers/renderHook";

import useComposedRef from "../src/useComposedRef";

function renderRefs(initialRefs: (Ref<HTMLDivElement> | undefined)[], strict = false) {
  let refs = initialRefs;

  function Component() {
    const ref = useComposedRef<HTMLDivElement>(...refs);
    return React.createElement("div", { ref });
  }

  function Wrapper({ children }: { children?: ReactNode }) {
    const content = React.createElement(
      React.Fragment,
      null,
      React.createElement(Component),
      children,
    );
    return strict ? React.createElement(StrictMode, null, content) : content;
  }

  // React 19 replays refs only with root-level StrictMode; older test libraries use the wrapper.
  const options = { wrapper: Wrapper, reactStrictMode: strict };
  const { rerender, unmount } = renderHook(() => undefined, options);
  return {
    unmount,
    rerender(nextRefs = refs) {
      refs = nextRefs;
      rerender();
    },
  };
}

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
    const { result } = renderHook(() =>
      useComposedRef<HTMLDivElement>(null, undefined, callbackRef),
    );

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

  describe("DOM lifecycle", () => {
    beforeEach(() => {
      jest.spyOn(console, "error").mockImplementation(() => {});
      jest.spyOn(console, "warn").mockImplementation(() => {});
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it.each([false, true])("clears legacy refs on unmount (StrictMode: %s)", (strict) => {
      const objectRef = { current: null as HTMLDivElement | null };
      const callbackRef = jest.fn();
      const { rerender, unmount } = renderRefs([objectRef, callbackRef, null, undefined], strict);
      const element = objectRef.current;
      const attachments = strict && parseInt(React.version) >= 19 ? 2 : 1;

      expect(element).toBeInstanceOf(HTMLDivElement);
      expect(callbackRef.mock.calls).toEqual(
        attachments === 2 ? [[element], [null], [element]] : [[element]],
      );

      rerender();
      expect(objectRef.current).toBe(element);
      expect(callbackRef).toHaveBeenCalledTimes(attachments * 2 - 1);

      unmount();
      expect(objectRef.current).toBeNull();
      expect(callbackRef).toHaveBeenCalledTimes(attachments * 2);
      expect(callbackRef).toHaveBeenLastCalledWith(null);
      expect(console.error).not.toHaveBeenCalled();
      expect(console.warn).not.toHaveBeenCalled();
    });

    it("detaches old legacy refs before attaching changed refs", () => {
      const events: string[] = [];
      const oldObject = { current: null as HTMLDivElement | null };
      const newObject = { current: null as HTMLDivElement | null };
      const oldCallback = jest.fn((node: HTMLDivElement | null) => {
        events.push(node ? "attach-old" : "detach-old");
      });
      const newCallback = jest.fn((node: HTMLDivElement | null) => {
        events.push(node ? "attach-new" : "detach-new");
      });
      const { rerender, unmount } = renderRefs([oldObject, oldCallback]);
      const element = oldObject.current;

      rerender([newObject, newCallback]);

      expect(oldObject.current).toBeNull();
      expect(newObject.current).toBe(element);
      expect(oldCallback.mock.calls).toEqual([[element], [null]]);
      expect(newCallback.mock.calls).toEqual([[element]]);
      expect(events).toEqual(["attach-old", "detach-old", "attach-new"]);

      unmount();
      expect(newObject.current).toBeNull();
      expect(oldCallback).toHaveBeenCalledTimes(2);
      expect(newCallback).toHaveBeenLastCalledWith(null);
      expect(events).toEqual(["attach-old", "detach-old", "attach-new", "detach-new"]);
      expect(console.error).not.toHaveBeenCalled();
      expect(console.warn).not.toHaveBeenCalled();
    });

    if (parseInt(React.version) >= 19) {
      it.each([false, true])("cleans up mixed refs on unmount (StrictMode: %s)", (strict) => {
        const cleanups: jest.Mock[] = [];
        const callbackRef = jest.fn((node: HTMLDivElement | null) => {
          if (node) {
            const cleanup = jest.fn();
            cleanups.push(cleanup);
            return cleanup;
          }
        });
        const legacyCallback = jest.fn();
        const objectRef = { current: null as HTMLDivElement | null };
        const { rerender, unmount } = renderRefs(
          [callbackRef, legacyCallback, objectRef, null, undefined],
          strict,
        );
        const element = objectRef.current;
        const attachments = strict ? 2 : 1;

        expect(element).toBeInstanceOf(HTMLDivElement);
        expect(callbackRef.mock.calls).toEqual(
          Array.from({ length: attachments }, () => [element]),
        );
        expect(cleanups.map((cleanup) => cleanup.mock.calls.length)).toEqual(strict ? [1, 0] : [0]);
        expect(legacyCallback.mock.calls).toEqual(
          strict ? [[element], [null], [element]] : [[element]],
        );

        rerender();
        expect(callbackRef).toHaveBeenCalledTimes(attachments);
        expect(legacyCallback).toHaveBeenCalledTimes(attachments * 2 - 1);
        expect(objectRef.current).toBe(element);
        expect(cleanups.map((cleanup) => cleanup.mock.calls.length)).toEqual(strict ? [1, 0] : [0]);

        unmount();
        expect(objectRef.current).toBeNull();
        expect(callbackRef).toHaveBeenCalledTimes(attachments);
        expect(cleanups.map((cleanup) => cleanup.mock.calls.length)).toEqual(strict ? [1, 1] : [1]);
        expect(legacyCallback).toHaveBeenCalledTimes(attachments * 2);
        expect(legacyCallback).toHaveBeenLastCalledWith(null);
        expect(console.error).not.toHaveBeenCalled();
        expect(console.warn).not.toHaveBeenCalled();
      });

      it("runs old cleanup before attaching changed refs and cleans up the latest refs on unmount", () => {
        const events: string[] = [];
        const oldCleanup = jest.fn(() => {
          events.push("cleanup-old");
        });
        const newCleanup = jest.fn(() => {
          events.push("cleanup-new");
        });
        const oldCallback = jest.fn(() => {
          events.push("attach-old");
          return oldCleanup;
        });
        const newCallback = jest.fn(() => {
          events.push("attach-new");
          return newCleanup;
        });
        const legacyCallback = jest.fn((node: HTMLDivElement | null) => {
          events.push(node ? "attach-legacy" : "detach-legacy");
        });
        const oldObject = { current: null as HTMLDivElement | null };
        const newObject = { current: null as HTMLDivElement | null };
        const { rerender, unmount } = renderRefs([oldCallback, legacyCallback, oldObject]);
        const element = oldObject.current;

        rerender([newCallback, legacyCallback, newObject]);

        expect(oldCleanup).toHaveBeenCalledTimes(1);
        expect(newCleanup).not.toHaveBeenCalled();
        expect(oldObject.current).toBeNull();
        expect(newObject.current).toBe(element);
        expect(oldCallback.mock.calls).toEqual([[element]]);
        expect(newCallback.mock.calls).toEqual([[element]]);
        expect(legacyCallback.mock.calls).toEqual([[element], [null], [element]]);
        expect(events).toEqual([
          "attach-old",
          "attach-legacy",
          "cleanup-old",
          "detach-legacy",
          "attach-new",
          "attach-legacy",
        ]);

        unmount();
        expect(oldCleanup).toHaveBeenCalledTimes(1);
        expect(newCleanup).toHaveBeenCalledTimes(1);
        expect(oldCallback).toHaveBeenCalledTimes(1);
        expect(newCallback).toHaveBeenCalledTimes(1);
        expect(newObject.current).toBeNull();
        expect(legacyCallback.mock.calls).toEqual([[element], [null], [element], [null]]);
        expect(events.slice(-2)).toEqual(["cleanup-new", "detach-legacy"]);
        expect(console.error).not.toHaveBeenCalled();
        expect(console.warn).not.toHaveBeenCalled();
      });
    }
  });
});
