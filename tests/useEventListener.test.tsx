import { act, fireEvent } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useEventListener from "../src/useEventListener";

describe("useEventListener", () => {
  it("registers an event listener on the target element", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);
    const listener = jest.fn();

    renderHook(() => useEventListener(element, "click", listener));

    fireEvent.click(element);
    expect(listener).toHaveBeenCalledTimes(1);

    fireEvent.click(element);
    expect(listener).toHaveBeenCalledTimes(2);

    element.remove();
  });

  it("removes the listener on unmount", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);
    const listener = jest.fn();

    const { unmount } = renderHook(() => useEventListener(element, "click", listener));

    unmount();

    fireEvent.click(element);
    expect(listener).not.toHaveBeenCalled();

    element.remove();
  });

  it("supports a ref-form target", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);
    const ref = { current: element };
    const listener = jest.fn();

    renderHook(() => useEventListener(ref, "click", listener));

    fireEvent.click(element);
    expect(listener).toHaveBeenCalledTimes(1);

    element.remove();
  });

  it("rebinds the listener when the target changes", () => {
    const firstElement = document.createElement("div");
    const secondElement = document.createElement("div");
    document.body.appendChild(firstElement);
    document.body.appendChild(secondElement);
    const listener = jest.fn();

    const { rerender } = renderHook(({ target }) => useEventListener(target, "click", listener), {
      initialProps: { target: firstElement as Element },
    });

    rerender({ target: secondElement });

    fireEvent.click(firstElement);
    expect(listener).not.toHaveBeenCalled();

    fireEvent.click(secondElement);
    expect(listener).toHaveBeenCalledTimes(1);

    firstElement.remove();
    secondElement.remove();
  });

  it("rebinds when the event name changes", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);
    const listener = jest.fn();

    const { rerender } = renderHook(({ eventName }) => useEventListener(element, eventName, listener), {
      initialProps: { eventName: "click" },
    });

    rerender({ eventName: "mouseenter" });

    fireEvent.click(element);
    expect(listener).not.toHaveBeenCalled();

    fireEvent.mouseEnter(element);
    expect(listener).toHaveBeenCalledTimes(1);

    element.remove();
  });

  it("once option: fires only once", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);
    const listener = jest.fn();

    renderHook(() => useEventListener(element, "click", listener, { once: true }));

    fireEvent.click(element);
    fireEvent.click(element);
    fireEvent.click(element);

    expect(listener).toHaveBeenCalledTimes(1);

    element.remove();
  });

  it("capture option takes effect", () => {
    const parent = document.createElement("div");
    const child = document.createElement("button");
    parent.appendChild(child);
    document.body.appendChild(parent);
    const listener = jest.fn();

    renderHook(() => useEventListener(parent, "click", listener, { capture: true }));

    fireEvent.click(child);
    expect(listener).toHaveBeenCalledTimes(1);

    parent.remove();
  });

  it("boolean-form capture option", () => {
    const parent = document.createElement("div");
    const child = document.createElement("button");
    parent.appendChild(child);
    document.body.appendChild(parent);
    const listener = jest.fn();

    renderHook(() => useEventListener(parent, "click", listener, true));

    fireEvent.click(child);
    expect(listener).toHaveBeenCalledTimes(1);

    parent.remove();
  });

  it("does not throw with an invalid target (null/non-EventTarget)", () => {
    const listener = jest.fn();
    const ref = { current: null };

    expect(() => {
      renderHook(() => useEventListener(ref, "click", listener));
    }).not.toThrow();

    fireEvent.click(document);
    expect(listener).not.toHaveBeenCalled();
  });

  it("uses the latest function after the listener updates", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);
    const first = jest.fn();
    const { rerender } = renderHook(({ listener }) => useEventListener(element, "click", listener), {
      initialProps: { listener: first },
    });

    const latest = jest.fn();
    rerender({ listener: latest });

    fireEvent.click(element);

    expect(first).not.toHaveBeenCalled();
    expect(latest).toHaveBeenCalledTimes(1);

    element.remove();
  });

  it("window as the target", () => {
    const listener = jest.fn();

    renderHook(() => useEventListener(window, "resize", listener));

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("document as the target", () => {
    const listener = jest.fn();

    renderHook(() => useEventListener(document, "keydown", listener));

    fireEvent.keyDown(document, { key: "a" });
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
