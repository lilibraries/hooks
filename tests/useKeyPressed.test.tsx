import React, { StrictMode } from "react";
import type { ReactNode } from "react";

import { act, fireEvent } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useKeyPressed from "../src/useKeyPressed";

function press(
  init: KeyboardEventInit = {},
  target: Element | Document = document,
  type = "keydown",
) {
  fireEvent(
    target,
    new KeyboardEvent(type, {
      key: "a",
      bubbles: true,
      cancelable: true,
      ...init,
    }),
  );
}

function setVisibilityState(value: "visible" | "hidden") {
  Object.defineProperty(document, "visibilityState", {
    configurable: true,
    value,
  });
}

function StrictWrapper({ children }: { children?: ReactNode }) {
  return React.createElement(StrictMode, null, children);
}

describe("useKeyPressed", () => {
  afterEach(() => {
    setVisibilityState("visible");
  });

  it("reports a pressed key", () => {
    const { result } = renderHook(() => useKeyPressed("a"));

    expect(result.current).toBe(false);

    press();
    expect(result.current).toBe(true);

    press({}, document, "keyup");
    expect(result.current).toBe(false);
  });

  it("matches regardless of case and modifiers", () => {
    const { result } = renderHook(() => useKeyPressed("a"));

    press({ key: "A", shiftKey: true, ctrlKey: true });
    expect(result.current).toBe(true);
  });

  it("matches key aliases", () => {
    const { result, rerender } = renderHook(({ keys }: { keys: string }) => useKeyPressed(keys), {
      initialProps: { keys: "esc" },
    });

    press({ key: "Escape" });
    expect(result.current).toBe(true);
    press({ key: "Escape" }, document, "keyup");

    rerender({ keys: "space" });
    press({ key: " " });
    expect(result.current).toBe(true);

    rerender({ keys: "up" });
    press({ key: "ArrowUp" });
    expect(result.current).toBe(true);
  });

  it("tracks modifier keys as ordinary keys", () => {
    const { result } = renderHook(() => useKeyPressed(["control", "shift"]));

    press({ key: "Control" });
    expect(result.current).toBe(true);

    press({ key: "Control" }, document, "keyup");
    expect(result.current).toBe(false);

    press({ key: "Shift" });
    expect(result.current).toBe(true);
  });

  it("reports true while any of the keys is held down", () => {
    const { result } = renderHook(() => useKeyPressed(["a", "b"]));

    press({ key: "a" });
    press({ key: "b" });
    expect(result.current).toBe(true);

    press({ key: "a" }, document, "keyup");
    expect(result.current).toBe(true);

    press({ key: "b" }, document, "keyup");
    expect(result.current).toBe(false);
  });

  it("treats aliased and duplicate keys as one", () => {
    const { result } = renderHook(() => useKeyPressed(["space", " ", "space"]));

    press({ key: " " });
    expect(result.current).toBe(true);

    press({ key: " " }, document, "keyup");
    expect(result.current).toBe(false);
  });

  it("matches the physical key position with eventField code", () => {
    const { result, rerender } = renderHook(
      ({ eventField }: { eventField?: "key" | "code" }) => useKeyPressed("c", { eventField }),
      { initialProps: { eventField: undefined as "key" | "code" | undefined } },
    );

    // macOS reports the produced character instead of the physical key
    press({ key: "ç", code: "KeyC", altKey: true });
    expect(result.current).toBe(false);

    press({ key: "ç", code: "KeyC", altKey: true }, document, "keyup");
    rerender({ eventField: "code" });

    press({ key: "ç", code: "KeyC", altKey: true });
    expect(result.current).toBe(true);
  });

  it("ignores keystrokes during an IME composition", () => {
    const { result } = renderHook(() => useKeyPressed("a"));

    press({ key: "a", isComposing: true });
    expect(result.current).toBe(false);
  });

  it("ignores key auto-repeat without extra renders", () => {
    const renders = jest.fn();

    const { result } = renderHook(() => {
      renders();
      return useKeyPressed("a");
    });

    press();
    expect(result.current).toBe(true);

    const afterPress = renders.mock.calls.length;

    press({ repeat: true });
    expect(result.current).toBe(true);
    expect(renders.mock.calls.length).toBe(afterPress);
  });

  it("releases a key whose release reports a different key", () => {
    const { result } = renderHook(() => useKeyPressed("c"));

    press({ key: "c", code: "KeyC" });
    expect(result.current).toBe(true);

    // Option+C on macOS reports "ç" on release while the physical key stays the same
    press({ key: "ç", code: "KeyC" }, document, "keyup");
    expect(result.current).toBe(false);
  });

  it("releases a symbol key whose release reports the shifted character", () => {
    const { result } = renderHook(() => useKeyPressed("="));

    press({ key: "=", code: "Equal" });
    expect(result.current).toBe(true);

    press({ key: "+", code: "Equal", shiftKey: true }, document, "keyup");
    expect(result.current).toBe(false);
  });

  it("does not release a key when another physical key is released", () => {
    const { result } = renderHook(() => useKeyPressed("a", { eventField: "code" }));

    // On AZERTY the physical KeyA produces "q"
    press({ key: "q", code: "KeyA" });
    expect(result.current).toBe(true);

    // The physical KeyQ produces "a" on the same layout
    press({ key: "a", code: "KeyQ" }, document, "keyup");
    expect(result.current).toBe(true);
  });

  it("does not release a key by a release without a physical code", () => {
    const { result } = renderHook(() => useKeyPressed("a"));

    press({ key: "a", code: "" });
    expect(result.current).toBe(true);

    // An on-screen keyboard or a synthetic event reports an empty code
    press({ key: "x", code: "" }, document, "keyup");
    expect(result.current).toBe(true);
  });

  it("keeps the sibling keys pressed when a release is matched by its physical key", () => {
    const { result } = renderHook(() => useKeyPressed(["a", "b"]));

    press({ key: "a", code: "KeyA" });
    press({ key: "b", code: "KeyB" });
    expect(result.current).toBe(true);

    press({ key: "þ", code: "KeyB", altKey: true }, document, "keyup");
    expect(result.current).toBe(true);

    press({ key: "a", code: "KeyA" }, document, "keyup");
    expect(result.current).toBe(false);
  });

  it("keeps a single record per physical key", () => {
    const { result } = renderHook(() => useKeyPressed(["=", "+"]));

    press({ key: "=", code: "Equal" });
    expect(result.current).toBe(true);

    // Shift is pressed while the physical key is held, so its auto-repeat reports "+"
    press({ key: "+", code: "Equal", shiftKey: true, repeat: true });
    expect(result.current).toBe(true);

    press({ key: "+", code: "Equal", shiftKey: true }, document, "keyup");
    expect(result.current).toBe(false);
  });

  it("releases a key whose modifier is released first", () => {
    const { result } = renderHook(() => useKeyPressed(["=", "+"]));

    press({ key: "=", code: "Equal" });
    press({ key: "+", code: "Equal", shiftKey: true, repeat: true });
    expect(result.current).toBe(true);

    press({ key: "Shift", code: "ShiftLeft" }, document, "keyup");
    press({ key: "=", code: "Equal" }, document, "keyup");
    expect(result.current).toBe(false);
  });

  it("keeps the key pressed while another physical key produces the same key", () => {
    const { result } = renderHook(() => useKeyPressed("shift"));

    press({ key: "Shift", code: "ShiftLeft" });
    press({ key: "Shift", code: "ShiftRight" });
    expect(result.current).toBe(true);

    press({ key: "Shift", code: "ShiftLeft" }, document, "keyup");
    expect(result.current).toBe(true);

    press({ key: "Shift", code: "ShiftRight" }, document, "keyup");
    expect(result.current).toBe(false);
  });

  it("does not release a key held by another physical key", () => {
    const { result } = renderHook(() => useKeyPressed("shift"));

    // ShiftLeft was already held before the hook started tracking
    press({ key: "Shift", code: "ShiftRight" });
    expect(result.current).toBe(true);

    press({ key: "Shift", code: "ShiftLeft" }, document, "keyup");
    expect(result.current).toBe(true);
  });

  it("does not release a physical key by a release without a code", () => {
    const { result } = renderHook(() => useKeyPressed("a"));

    press({ key: "a", code: "KeyA" });
    expect(result.current).toBe(true);

    press({ key: "a", code: "" }, document, "keyup");
    expect(result.current).toBe(true);
  });

  it("does not release a no-code record by a release with an untracked code", () => {
    const { result } = renderHook(() => useKeyPressed("a"));

    press({ key: "a", code: "" });
    expect(result.current).toBe(true);

    // A physical key whose press was never recorded, e.g. pressed before tracking started
    press({ key: "a", code: "KeyA" }, document, "keyup");
    expect(result.current).toBe(true);

    press({ key: "a", code: "" }, document, "keyup");
    expect(result.current).toBe(false);
  });

  it("treats unidentified codes as input without a physical key", () => {
    const { result } = renderHook(() => useKeyPressed("a"));

    press({ key: "a", code: "Unidentified" });
    expect(result.current).toBe(true);

    press({ key: "x", code: "Unidentified" }, document, "keyup");
    expect(result.current).toBe(true);
  });

  it("resets when the window loses focus", () => {
    const { result } = renderHook(() => useKeyPressed("a"));

    press();
    expect(result.current).toBe(true);

    act(() => {
      window.dispatchEvent(new Event("blur"));
    });
    expect(result.current).toBe(false);
  });

  it("resets when the page is hidden", () => {
    setVisibilityState("visible");
    const { result } = renderHook(() => useKeyPressed("a"));

    press();
    expect(result.current).toBe(true);

    act(() => {
      setVisibilityState("hidden");
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(result.current).toBe(false);
  });

  it("releases the key when keyup happens outside the target", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);

    try {
      const { result } = renderHook(() => useKeyPressed("a", { target: element }));

      press({}, element);
      expect(result.current).toBe(true);

      press({}, document, "keyup");
      expect(result.current).toBe(false);
    } finally {
      element.remove();
    }
  });

  it("listens on a custom target", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);

    try {
      const { result } = renderHook(() => useKeyPressed("a", { target: element }));

      press();
      expect(result.current).toBe(false);

      press({}, element);
      expect(result.current).toBe(true);
    } finally {
      element.remove();
    }
  });

  it("listens on a target ref that is assigned after render", () => {
    const targetRef = { current: null as HTMLElement | null };

    function Wrapper({ children }: { children?: ReactNode }) {
      return React.createElement("div", { ref: targetRef }, children);
    }

    const { result } = renderHook(() => useKeyPressed("a", { target: targetRef }), {
      wrapper: Wrapper,
    });

    const element = targetRef.current;
    if (!element) {
      throw new Error("The target was not rendered.");
    }

    press();
    expect(result.current).toBe(false);

    press({}, element);
    expect(result.current).toBe(true);
  });

  it("does not listen on the document when the target ref is still empty", () => {
    const { result } = renderHook(() => useKeyPressed("a", { target: { current: null } }));

    press();
    expect(result.current).toBe(false);
  });

  it("moves the tracking when the target changes", () => {
    const first = document.createElement("div");
    const second = document.createElement("div");
    document.body.appendChild(first);
    document.body.appendChild(second);

    try {
      const { result, rerender } = renderHook(
        ({ target }: { target: Element }) => useKeyPressed("a", { target }),
        { initialProps: { target: first } },
      );

      press({}, first);
      expect(result.current).toBe(true);

      press({}, document, "keyup");
      expect(result.current).toBe(false);

      rerender({ target: second });

      press({}, first);
      expect(result.current).toBe(false);

      press({}, second);
      expect(result.current).toBe(true);
    } finally {
      first.remove();
      second.remove();
    }
  });

  it("does not reattach the listeners on unrelated renders", () => {
    const addSpy = jest.spyOn(document, "addEventListener");

    try {
      const keydownCalls = () => addSpy.mock.calls.filter((call) => call[0] === "keydown").length;

      const { rerender } = renderHook(
        ({ value }: { value: number }) => useKeyPressed("a", { enabled: value >= 0 }),
        { initialProps: { value: 0 } },
      );

      const attached = keydownCalls();

      rerender({ value: 1 });
      rerender({ value: 2 });

      expect(keydownCalls()).toBe(attached);
    } finally {
      addSpy.mockRestore();
    }
  });

  it("does not listen and reports false when disabled", () => {
    const { result, rerender } = renderHook(
      ({ enabled }: { enabled: boolean }) => useKeyPressed("a", { enabled }),
      { initialProps: { enabled: false } },
    );

    press();
    expect(result.current).toBe(false);

    rerender({ enabled: true });
    expect(result.current).toBe(false);

    press();
    expect(result.current).toBe(true);
  });

  it("stops listening and resets when disabled at runtime", () => {
    const removeSpy = jest.spyOn(document, "removeEventListener");
    const windowRemoveSpy = jest.spyOn(window, "removeEventListener");

    try {
      const { result, rerender } = renderHook(
        ({ enabled }: { enabled: boolean }) => useKeyPressed("a", { enabled }),
        { initialProps: { enabled: true } },
      );

      press();
      expect(result.current).toBe(true);

      rerender({ enabled: false });
      expect(result.current).toBe(false);

      press();
      expect(result.current).toBe(false);
      // The listeners must be detached, not merely short-circuited inside the handlers
      expect(removeSpy.mock.calls.some((call) => call[0] === "keydown")).toBe(true);
      expect(removeSpy.mock.calls.some((call) => call[0] === "keyup")).toBe(true);
      expect(windowRemoveSpy.mock.calls.some((call) => call[0] === "blur")).toBe(true);
    } finally {
      removeSpy.mockRestore();
      windowRemoveSpy.mockRestore();
    }
  });

  it("tracks the new keys after they change", () => {
    const { result, rerender } = renderHook(({ keys }: { keys: string }) => useKeyPressed(keys), {
      initialProps: { keys: "a" },
    });

    press({ key: "a" });
    expect(result.current).toBe(true);

    rerender({ keys: "b" });
    expect(result.current).toBe(false);

    press({ key: "b" });
    expect(result.current).toBe(true);
  });

  it("uses the latest keys and options after an update", () => {
    const { result, rerender } = renderHook(
      ({ keys, eventField }: { keys: string; eventField: "key" | "code" }) =>
        useKeyPressed(keys, { eventField }),
      {
        initialProps: { keys: "a", eventField: "key" } as {
          keys: string;
          eventField: "key" | "code";
        },
      },
    );

    press({ key: "a" });
    expect(result.current).toBe(true);

    rerender({ keys: "c", eventField: "code" });
    expect(result.current).toBe(false);

    press({ key: "a" });
    expect(result.current).toBe(false);

    press({ key: "ç", code: "KeyC" });
    expect(result.current).toBe(true);
  });

  it("stops tracking after unmount", () => {
    const removeSpy = jest.spyOn(document, "removeEventListener");

    try {
      const { unmount } = renderHook(() => useKeyPressed("a"));
      unmount();

      expect(() => press()).not.toThrow();
      expect(removeSpy.mock.calls.some((call) => call[0] === "keyup")).toBe(true);
    } finally {
      removeSpy.mockRestore();
    }
  });

  it("works in StrictMode", () => {
    const options = { wrapper: StrictWrapper, reactStrictMode: true };
    const { result } = renderHook(() => useKeyPressed("a"), options);

    press();
    expect(result.current).toBe(true);

    press({}, document, "keyup");
    expect(result.current).toBe(false);
  });

  it("warns about a shortcut token once", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    try {
      const { rerender } = renderHook(() => useKeyPressed("alt+enter"));
      rerender();

      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining("Invalid key `alt+enter`"));
    } finally {
      errorSpy.mockRestore();
    }
  });

  it("does not warn about the plus key", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    try {
      renderHook(() => useKeyPressed("+"));

      expect(errorSpy).not.toHaveBeenCalled();
    } finally {
      errorSpy.mockRestore();
    }
  });
});
