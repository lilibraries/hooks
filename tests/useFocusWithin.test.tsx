import React, { StrictMode } from "react";
import type { ReactNode } from "react";

import renderHook from "./helpers/renderHook";

import useFocusWithin from "../src/useFocusWithin";

function StrictWrapper({ children }: { children?: ReactNode }) {
  return React.createElement(StrictMode, null, children);
}

// `reactStrictMode` is only read by @testing-library/react-hooks (React 16/17)
const strictOptions = { wrapper: StrictWrapper, reactStrictMode: true };

function createDom() {
  const container = document.createElement("div");
  container.id = "container";
  const target = document.createElement("div");
  target.id = "target";
  const first = document.createElement("input");
  first.id = "first";
  const second = document.createElement("input");
  second.id = "second";
  const outside = document.createElement("input");
  outside.id = "outside";
  target.appendChild(first);
  target.appendChild(second);
  container.appendChild(target);
  container.appendChild(outside);
  document.body.appendChild(container);
  return { container, target, first, second, outside };
}

function cleanup(dom: { container: HTMLElement }) {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
  dom.container.remove();
}

describe("useFocusWithin", () => {
  it("fires with true when the focus enters the target", () => {
    const dom = createDom();
    const listener = jest.fn();

    renderHook(() => useFocusWithin(dom.target, listener));

    dom.first.focus();

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(true, expect.anything());
    expect((listener.mock.calls[0][1] as FocusEvent).type).toBe("focusin");

    cleanup(dom);
  });

  it("reports entering with the focusin event of the element inside the target", () => {
    const dom = createDom();
    const listener = jest.fn();

    renderHook(() => useFocusWithin(dom.target, listener));

    // With another element focused, the browser also fires a `focusout` on it
    dom.outside.focus();
    dom.first.focus();

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.calls[0][0]).toBe(true);
    const event = listener.mock.calls[0][1] as FocusEvent;
    expect(event.type).toBe("focusin");
    expect(event.target).toBe(dom.first);
    expect(event.relatedTarget).toBe(dom.outside);

    cleanup(dom);
  });

  it("fires with false when the focus leaves the target", () => {
    const dom = createDom();
    const listener = jest.fn();

    renderHook(() => useFocusWithin(dom.target, listener));

    dom.first.focus();
    dom.outside.focus();

    expect(listener).toHaveBeenCalledTimes(2);
    expect(listener.mock.calls[1][0]).toBe(false);
    const event = listener.mock.calls[1][1] as FocusEvent;
    expect(event.type).toBe("focusout");
    expect(event.target).toBe(dom.first);
    expect(event.relatedTarget).toBe(dom.outside);

    cleanup(dom);
  });

  it("does not fire when the focus moves between elements of the target", () => {
    const dom = createDom();
    const listener = jest.fn();

    renderHook(() => useFocusWithin(dom.target, listener));

    dom.first.focus();
    dom.second.focus();
    dom.first.focus();

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(true, expect.anything());

    cleanup(dom);
  });

  it("counts the target itself as within", () => {
    const dom = createDom();
    dom.target.tabIndex = 0;
    const listener = jest.fn();

    renderHook(() => useFocusWithin(dom.target, listener));

    dom.target.focus();
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(true, expect.anything());

    dom.outside.focus();
    expect(listener).toHaveBeenCalledTimes(2);
    expect(listener.mock.calls[1][0]).toBe(false);

    cleanup(dom);
  });

  it("supports multiple targets (array)", () => {
    const dom = createDom();
    const another = document.createElement("input");
    dom.container.appendChild(another);
    const listener = jest.fn();

    renderHook(() => useFocusWithin([dom.first, another], listener));

    dom.first.focus();
    expect(listener).toHaveBeenCalledTimes(1);

    // Moving between the targets is still "within"
    another.focus();
    expect(listener).toHaveBeenCalledTimes(1);

    dom.outside.focus();
    expect(listener).toHaveBeenCalledTimes(2);
    expect(listener.mock.calls[1][0]).toBe(false);

    cleanup(dom);
  });

  it("supports a ref-form target", () => {
    const dom = createDom();
    const ref = { current: dom.target as Element | null };
    const listener = jest.fn();

    renderHook(() => useFocusWithin(ref, listener));

    dom.first.focus();
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(true, expect.anything());

    cleanup(dom);
  });

  it("works when the target ref is assigned late", () => {
    const dom = createDom();
    const ref = { current: null as Element | null };
    const listener = jest.fn();

    renderHook(() => useFocusWithin(ref, listener));
    // Assigned just before the focus event fires
    ref.current = dom.target;

    dom.first.focus();
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(true, expect.anything());

    cleanup(dom);
  });

  it("does not fire when all targets are invalid", () => {
    const dom = createDom();
    const ref = { current: null };
    const listener = jest.fn();

    renderHook(() => useFocusWithin(ref, listener));

    dom.first.focus();
    dom.outside.focus();
    expect(listener).not.toHaveBeenCalled();

    cleanup(dom);
  });

  it("treats a null relatedTarget as leaving the target", () => {
    const dom = createDom();
    const listener = jest.fn();

    renderHook(() => useFocusWithin(dom.target, listener));

    dom.first.focus();
    dom.first.blur();

    expect(listener).toHaveBeenCalledTimes(2);
    const event = listener.mock.calls[1][1] as FocusEvent;
    expect(event.type).toBe("focusout");
    expect(event.relatedTarget).toBe(null);
    expect(listener.mock.calls[1][0]).toBe(false);

    // Entering again is reported even though the "out" transition was inferred
    dom.second.focus();
    expect(listener).toHaveBeenCalledTimes(3);
    expect(listener.mock.calls[2][0]).toBe(true);

    cleanup(dom);
  });

  it("does not fire for the state that already exists at mount", () => {
    const dom = createDom();
    const listener = jest.fn();

    dom.first.focus();
    renderHook(() => useFocusWithin(dom.target, listener));

    expect(listener).not.toHaveBeenCalled();

    dom.outside.focus();
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(false, expect.anything());

    cleanup(dom);
  });

  it("calls the listener once per state change", () => {
    const dom = createDom();
    const listener = jest.fn();

    renderHook(() => useFocusWithin(dom.target, listener));

    dom.first.focus();
    dom.second.focus();
    dom.outside.focus();
    dom.first.focus();

    expect(listener.mock.calls.map((call) => call[0])).toEqual([true, false, true]);

    cleanup(dom);
  });

  it("follows the target after it changes", () => {
    const dom = createDom();
    const another = document.createElement("div");
    const anotherInput = document.createElement("input");
    another.appendChild(anotherInput);
    dom.container.appendChild(another);
    const listener = jest.fn();

    const { rerender } = renderHook(({ target }) => useFocusWithin(target, listener), {
      initialProps: { target: dom.target },
    });

    dom.first.focus();
    expect(listener).toHaveBeenCalledTimes(1);

    rerender({ target: another });

    // The focus moves from outside the new target to inside it
    anotherInput.focus();
    expect(listener).toHaveBeenCalledTimes(2);
    expect(listener.mock.calls[1][0]).toBe(true);

    cleanup(dom);
  });

  it("stops firing after unmount", () => {
    const dom = createDom();
    const listener = jest.fn();

    const { unmount } = renderHook(() => useFocusWithin(dom.target, listener));
    dom.first.focus();
    expect(listener).toHaveBeenCalledTimes(1);

    unmount();
    dom.outside.focus();
    dom.first.focus();

    expect(listener).toHaveBeenCalledTimes(1);

    cleanup(dom);
  });

  it("uses the latest function after the listener updates", () => {
    const dom = createDom();
    const first = jest.fn();

    const { rerender } = renderHook(({ listener }) => useFocusWithin(dom.target, listener), {
      initialProps: { listener: first },
    });

    const latest = jest.fn();
    rerender({ listener: latest });

    dom.first.focus();

    expect(first).not.toHaveBeenCalled();
    expect(latest).toHaveBeenCalledTimes(1);

    cleanup(dom);
  });

  it("works under StrictMode without duplicate or leaked listeners", () => {
    const dom = createDom();
    const listener = jest.fn();
    const addSpy = jest.spyOn(document, "addEventListener");
    const removeSpy = jest.spyOn(document, "removeEventListener");
    const isFocusEvent = (call: [string, ...unknown[]]) =>
      call[0] === "focusin" || call[0] === "focusout";

    try {
      const { unmount } = renderHook(() => useFocusWithin(dom.target, listener), strictOptions);

      dom.first.focus();
      dom.outside.focus();
      expect(listener.mock.calls.map((call) => call[0])).toEqual([true, false]);

      unmount();
      expect(removeSpy.mock.calls.filter(isFocusEvent)).toHaveLength(
        addSpy.mock.calls.filter(isFocusEvent).length,
      );
    } finally {
      addSpy.mockRestore();
      removeSpy.mockRestore();
      cleanup(dom);
    }
  });
});
