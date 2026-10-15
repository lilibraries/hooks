import { fireEvent } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useClickOutside from "../src/useClickOutside";

function createDom() {
  const container = document.createElement("div");
  container.id = "container";
  const target = document.createElement("div");
  target.id = "target";
  const inside = document.createElement("span");
  inside.id = "inside";
  const outside = document.createElement("div");
  outside.id = "outside";
  target.appendChild(inside);
  container.appendChild(target);
  container.appendChild(outside);
  document.body.appendChild(container);
  return { container, target, inside, outside };
}

function cleanup(element: HTMLElement) {
  element.remove();
}

describe("useClickOutside", () => {
  it("fires the callback when clicking outside the target", () => {
    const dom = createDom();
    const listener = jest.fn();

    renderHook(() => useClickOutside(dom.target, listener));

    fireEvent.mouseDown(dom.outside);
    expect(listener).toHaveBeenCalledTimes(1);

    cleanup(dom.container);
  });

  it("does not fire when clicking inside the target", () => {
    const dom = createDom();
    const listener = jest.fn();

    renderHook(() => useClickOutside(dom.target, listener));

    fireEvent.mouseDown(dom.target);
    fireEvent.mouseDown(dom.inside);
    expect(listener).not.toHaveBeenCalled();

    cleanup(dom.container);
  });

  it("supports multiple targets (array)", () => {
    const dom = createDom();
    const another = document.createElement("div");
    dom.container.appendChild(another);
    const listener = jest.fn();

    renderHook(() => useClickOutside([dom.target, another], listener));

    fireEvent.mouseDown(dom.target);
    expect(listener).not.toHaveBeenCalled();

    fireEvent.mouseDown(another);
    expect(listener).not.toHaveBeenCalled();

    fireEvent.mouseDown(dom.outside);
    expect(listener).toHaveBeenCalledTimes(1);

    cleanup(dom.container);
  });

  it("supports a ref-form target", () => {
    const dom = createDom();
    const ref = { current: dom.target };
    const listener = jest.fn();

    renderHook(() => useClickOutside(ref, listener));

    fireEvent.mouseDown(dom.outside);
    expect(listener).toHaveBeenCalledTimes(1);

    cleanup(dom.container);
  });

  it("works when the target ref is assigned late", () => {
    const dom = createDom();
    const ref = { current: null as Element | null };
    const listener = jest.fn();

    renderHook(() => useClickOutside(ref, listener));
    // Assigned just before the event fires
    ref.current = dom.target;

    fireEvent.mouseDown(dom.outside);
    expect(listener).toHaveBeenCalledTimes(1);

    cleanup(dom.container);
  });

  it("does not fire the callback when all targets are invalid", () => {
    const dom = createDom();
    const ref = { current: null };
    const listener = jest.fn();

    renderHook(() => useClickOutside(ref, listener));

    fireEvent.mouseDown(dom.outside);
    expect(listener).not.toHaveBeenCalled();

    cleanup(dom.container);
  });

  it("supports a custom event name", () => {
    const dom = createDom();
    const listener = jest.fn();

    renderHook(() => useClickOutside(dom.target, listener, { eventName: "click" }));

    fireEvent.mouseDown(dom.outside);
    expect(listener).not.toHaveBeenCalled();

    fireEvent.click(dom.outside);
    expect(listener).toHaveBeenCalledTimes(1);

    cleanup(dom.container);
  });

  it("supports multiple event names", () => {
    const dom = createDom();
    const listener = jest.fn();

    renderHook(() =>
      useClickOutside(dom.target, listener, {
        eventName: ["mousedown", "click"],
      }),
    );

    fireEvent.mouseDown(dom.outside);
    expect(listener).toHaveBeenCalledTimes(1);

    fireEvent.click(dom.outside);
    expect(listener).toHaveBeenCalledTimes(2);

    cleanup(dom.container);
  });

  it("custom container: events outside the container do not fire", () => {
    const dom = createDom();
    const listener = jest.fn();
    const otherContainer = document.createElement("div");
    document.body.appendChild(otherContainer);

    renderHook(() => useClickOutside(dom.target, listener, { container: dom.container }));

    // The event happens outside the container, so the container never receives it
    fireEvent.mouseDown(otherContainer);
    expect(listener).not.toHaveBeenCalled();

    fireEvent.mouseDown(dom.outside);
    expect(listener).toHaveBeenCalledTimes(1);

    cleanup(dom.container);
    otherContainer.remove();
  });

  it("stops firing after unmount", () => {
    const dom = createDom();
    const listener = jest.fn();

    const { unmount } = renderHook(() => useClickOutside(dom.target, listener));
    unmount();

    fireEvent.mouseDown(dom.outside);
    expect(listener).not.toHaveBeenCalled();

    cleanup(dom.container);
  });

  it("uses the latest function after the listener updates", () => {
    const dom = createDom();
    const first = jest.fn();

    const { rerender } = renderHook(({ listener }) => useClickOutside(dom.target, listener), {
      initialProps: { listener: first },
    });

    const latest = jest.fn();
    rerender({ listener: latest });

    fireEvent.mouseDown(dom.outside);

    expect(first).not.toHaveBeenCalled();
    expect(latest).toHaveBeenCalledTimes(1);

    cleanup(dom.container);
  });
});
