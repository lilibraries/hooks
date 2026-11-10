import React, { StrictMode } from "react";
import type { ReactNode } from "react";

import { fireEvent } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useHotkey from "../src/useHotkey";

function press(
  init: KeyboardEventInit = {},
  target: Element | Document = document,
  type = "keydown",
) {
  const event = new KeyboardEvent(type, {
    key: "k",
    bubbles: true,
    cancelable: true,
    ...init,
  });
  fireEvent(target, event);
  return event;
}

function StrictWrapper({ children }: { children?: ReactNode }) {
  return React.createElement(StrictMode, null, children);
}

describe("useHotkey", () => {
  it("fires when the hotkey is pressed", () => {
    const listener = jest.fn();

    renderHook(() => useHotkey("ctrl+k", listener));
    press({ key: "k", ctrlKey: true });

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(expect.objectContaining({ key: "k" }));
  });

  it("does not fire when the key or the modifiers differ", () => {
    const listener = jest.fn();

    renderHook(() => useHotkey("ctrl+k", listener));
    press({ key: "j", ctrlKey: true });
    press({ key: "k" });
    press({ key: "k", ctrlKey: true, shiftKey: true });

    expect(listener).not.toHaveBeenCalled();
  });

  it("fires for any of the given hotkeys", () => {
    const listener = jest.fn();

    renderHook(() => useHotkey(["mod+k", "escape"], listener));
    press({ key: "Escape" });
    press({ key: "k", ctrlKey: true });

    expect(listener).toHaveBeenCalledTimes(2);
  });

  it("matches the physical key position with eventField code", () => {
    const listener = jest.fn();

    renderHook(() => useHotkey("alt+c", listener, { eventField: "code" }));
    // macOS reports the produced character instead of the physical key
    press({ key: "ç", code: "KeyC", altKey: true });

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("ignores keystrokes during an IME composition", () => {
    const listener = jest.fn();

    renderHook(() => useHotkey("ctrl+k", listener));
    press({ key: "k", ctrlKey: true, isComposing: true });

    expect(listener).not.toHaveBeenCalled();
  });

  it("ignores key auto-repeat unless repeatable", () => {
    const listener = jest.fn();

    const { rerender } = renderHook(
      ({ repeatable }: { repeatable: boolean }) => useHotkey("ctrl+k", listener, { repeatable }),
      { initialProps: { repeatable: false } },
    );

    press({ key: "k", ctrlKey: true, repeat: true });
    expect(listener).not.toHaveBeenCalled();

    rerender({ repeatable: true });
    press({ key: "k", ctrlKey: true, repeat: true });
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("ignores keystrokes in editable elements by default", () => {
    const input = document.createElement("input");
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    document.body.appendChild(input);
    document.body.appendChild(checkbox);

    try {
      const listener = jest.fn();
      const { rerender } = renderHook(
        ({ allowInEditable }: { allowInEditable: boolean }) =>
          useHotkey("ctrl+k", listener, { allowInEditable }),
        { initialProps: { allowInEditable: false } },
      );

      press({ key: "k", ctrlKey: true }, input);
      expect(listener).not.toHaveBeenCalled();

      // Inputs that do not accept text do not swallow shortcuts
      press({ key: "k", ctrlKey: true }, checkbox);
      expect(listener).toHaveBeenCalledTimes(1);

      rerender({ allowInEditable: true });
      press({ key: "k", ctrlKey: true }, input);
      expect(listener).toHaveBeenCalledTimes(2);
    } finally {
      input.remove();
      checkbox.remove();
    }
  });

  it("ignores content-editable elements by default", () => {
    const editable = document.createElement("div");
    editable.setAttribute("contenteditable", "true");
    document.body.appendChild(editable);

    try {
      const listener = jest.fn();
      const { rerender } = renderHook(
        ({ allowInEditable }: { allowInEditable: boolean }) =>
          useHotkey("ctrl+k", listener, { allowInEditable }),
        { initialProps: { allowInEditable: false } },
      );

      press({ key: "k", ctrlKey: true }, editable);
      expect(listener).not.toHaveBeenCalled();

      rerender({ allowInEditable: true });
      press({ key: "k", ctrlKey: true }, editable);
      expect(listener).toHaveBeenCalledTimes(1);
    } finally {
      editable.remove();
    }
  });

  it("listens on keyup when eventName is set", () => {
    const listener = jest.fn();

    renderHook(() => useHotkey("ctrl+k", listener, { eventName: "keyup" }));
    press({ key: "k", ctrlKey: true });
    expect(listener).not.toHaveBeenCalled();

    press({ key: "k", ctrlKey: true }, document, "keyup");
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("prevents the default action when enabled", () => {
    const listener = jest.fn();

    const { rerender } = renderHook(
      ({ preventDefault }: { preventDefault: boolean }) =>
        useHotkey("ctrl+k", listener, { preventDefault }),
      { initialProps: { preventDefault: false } },
    );

    expect(press({ key: "k", ctrlKey: true }).defaultPrevented).toBe(false);

    rerender({ preventDefault: true });
    expect(press({ key: "k", ctrlKey: true }).defaultPrevented).toBe(true);
  });

  it("does not listen when disabled", () => {
    const listener = jest.fn();

    const { rerender } = renderHook(
      ({ enabled }: { enabled: boolean }) => useHotkey("ctrl+k", listener, { enabled }),
      { initialProps: { enabled: false } },
    );

    press({ key: "k", ctrlKey: true });
    expect(listener).not.toHaveBeenCalled();

    rerender({ enabled: true });
    press({ key: "k", ctrlKey: true });
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("stops listening when disabled at runtime", () => {
    const listener = jest.fn();
    const removeSpy = jest.spyOn(document, "removeEventListener");

    try {
      const { rerender } = renderHook(
        ({ enabled }: { enabled: boolean }) => useHotkey("ctrl+k", listener, { enabled }),
        { initialProps: { enabled: true } },
      );

      press({ key: "k", ctrlKey: true });
      expect(listener).toHaveBeenCalledTimes(1);

      rerender({ enabled: false });
      press({ key: "k", ctrlKey: true });
      expect(listener).toHaveBeenCalledTimes(1);
      // The listener must be detached, not merely short-circuited inside the handler
      expect(removeSpy.mock.calls.some((call) => call[0] === "keydown")).toBe(true);
    } finally {
      removeSpy.mockRestore();
    }
  });

  it("does not reattach the listener on unrelated renders", () => {
    const listener = jest.fn();
    const addSpy = jest.spyOn(document, "addEventListener");
    const removeSpy = jest.spyOn(document, "removeEventListener");

    try {
      const { rerender } = renderHook(
        ({ value }: { value: number }) => useHotkey("ctrl+k", listener, { enabled: value >= 0 }),
        { initialProps: { value: 0 } },
      );

      const keydownCalls = (spy: jest.SpyInstance) =>
        spy.mock.calls.filter((call) => call[0] === "keydown").length;

      expect(keydownCalls(addSpy)).toBe(1);

      rerender({ value: 1 });
      rerender({ value: 2 });

      expect(keydownCalls(addSpy)).toBe(1);
      expect(keydownCalls(removeSpy)).toBe(0);
    } finally {
      addSpy.mockRestore();
      removeSpy.mockRestore();
    }
  });

  it("listens on a custom target", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);

    try {
      const listener = jest.fn();
      renderHook(() => useHotkey("ctrl+k", listener, { target: element }));

      press({ key: "k", ctrlKey: true });
      expect(listener).not.toHaveBeenCalled();

      press({ key: "k", ctrlKey: true }, element);
      expect(listener).toHaveBeenCalledTimes(1);
    } finally {
      element.remove();
    }
  });

  it("supports a ref-form target", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);

    try {
      const listener = jest.fn();
      renderHook(() => useHotkey("ctrl+k", listener, { target: { current: element } }));

      press({ key: "k", ctrlKey: true });
      expect(listener).not.toHaveBeenCalled();

      press({ key: "k", ctrlKey: true }, element);
      expect(listener).toHaveBeenCalledTimes(1);
    } finally {
      element.remove();
    }
  });

  it("listens on a target ref that is assigned after render", () => {
    const targetRef = { current: null as HTMLElement | null };
    const listener = jest.fn();

    function Wrapper({ children }: { children?: ReactNode }) {
      return React.createElement("div", { ref: targetRef }, children);
    }

    const options = { wrapper: Wrapper };
    renderHook(() => useHotkey("ctrl+k", listener, { target: targetRef }), options);

    const element = targetRef.current;
    if (!element) {
      throw new Error("The target was not rendered.");
    }

    press({ key: "k", ctrlKey: true });
    expect(listener).not.toHaveBeenCalled();

    press({ key: "k", ctrlKey: true }, element);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("does not listen on the document when the target ref is still empty", () => {
    const listener = jest.fn();

    renderHook(() => useHotkey("ctrl+k", listener, { target: { current: null } }));
    press({ key: "k", ctrlKey: true });

    expect(listener).not.toHaveBeenCalled();
  });

  it("moves the listener when the target changes", () => {
    const first = document.createElement("div");
    const second = document.createElement("div");
    document.body.appendChild(first);
    document.body.appendChild(second);

    try {
      const listener = jest.fn();
      const { rerender } = renderHook(
        ({ target }: { target: Element }) => useHotkey("ctrl+k", listener, { target }),
        { initialProps: { target: first } },
      );

      press({ key: "k", ctrlKey: true }, first);
      expect(listener).toHaveBeenCalledTimes(1);

      rerender({ target: second });

      press({ key: "k", ctrlKey: true }, first);
      expect(listener).toHaveBeenCalledTimes(1);

      press({ key: "k", ctrlKey: true }, second);
      expect(listener).toHaveBeenCalledTimes(2);
    } finally {
      first.remove();
      second.remove();
    }
  });

  it("attaches when a target ref is assigned after mount", () => {
    const targetRef = { current: null as HTMLElement | null };
    const listener = jest.fn();

    const { rerender } = renderHook(() => useHotkey("ctrl+k", listener, { target: targetRef }));

    press({ key: "k", ctrlKey: true });
    expect(listener).not.toHaveBeenCalled();

    const element = document.createElement("div");
    targetRef.current = element;
    rerender();

    press({ key: "k", ctrlKey: true }, element);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("uses the latest listener and options after an update", () => {
    const first = jest.fn();
    const latest = jest.fn();

    const { rerender } = renderHook(
      ({ listener, keys }: { listener: (event: KeyboardEvent) => void; keys: string }) =>
        useHotkey(keys, listener),
      { initialProps: { listener: first, keys: "ctrl+k" } },
    );

    rerender({ listener: latest, keys: "ctrl+j" });

    press({ key: "k", ctrlKey: true });
    expect(first).not.toHaveBeenCalled();
    expect(latest).not.toHaveBeenCalled();

    press({ key: "j", ctrlKey: true });
    expect(latest).toHaveBeenCalledTimes(1);
  });

  it("stops listening after unmount", () => {
    const listener = jest.fn();

    const { unmount } = renderHook(() => useHotkey("ctrl+k", listener));
    unmount();
    press({ key: "k", ctrlKey: true });

    expect(listener).not.toHaveBeenCalled();
  });

  it("warns about an invalid hotkey once at mount", () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    try {
      const { rerender } = renderHook(() => useHotkey("ctrl+alt", () => {}));
      rerender();

      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy).toHaveBeenCalledWith(
        expect.stringContaining("[useHotkey] Invalid hotkey `ctrl+alt`"),
      );
    } finally {
      errorSpy.mockRestore();
    }
  });

  it("does not fire twice in StrictMode", () => {
    const listener = jest.fn();
    const options = { wrapper: StrictWrapper, reactStrictMode: true };

    renderHook(() => useHotkey("ctrl+k", listener, { enabled: true }), options);
    press({ key: "k", ctrlKey: true });

    expect(listener).toHaveBeenCalledTimes(1);
  });
});
