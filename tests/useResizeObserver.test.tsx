import renderHook from "./helpers/renderHook";

import useResizeObserver from "../src/useResizeObserver";

import { MockResizeObserver } from "./helpers/mocks";

describe("useResizeObserver", () => {
  it("observes the target element on mount", () => {
    const element = document.createElement("div");
    const listener = jest.fn();

    renderHook(() => useResizeObserver(element, listener));

    expect(MockResizeObserver.instances).toHaveLength(1);
    expect(MockResizeObserver.instances[0].observed).toContain(element);
  });

  it("fires the listener on size changes", () => {
    const element = document.createElement("div");
    const listener = jest.fn();

    renderHook(() => useResizeObserver(element, listener));

    MockResizeObserver.instances[0].trigger(element);
    expect(listener).toHaveBeenCalledTimes(1);

    MockResizeObserver.instances[0].trigger(element);
    expect(listener).toHaveBeenCalledTimes(2);
  });

  it("the entries passed on trigger contain the target element", () => {
    const element = document.createElement("div");
    let received: ResizeObserverEntry[] = [];
    renderHook(() =>
      useResizeObserver(element, (entries) => {
        received = entries;
      }),
    );

    MockResizeObserver.instances[0].trigger(element);

    expect(received).toHaveLength(1);
    expect(received[0].target).toBe(element);
  });

  it("disconnects the observer on unmount", () => {
    const element = document.createElement("div");
    const { unmount } = renderHook(() => useResizeObserver(element, jest.fn()));

    unmount();

    expect(MockResizeObserver.instances[0].disconnected).toBe(true);
  });

  it("does not create an observer when the target is null", () => {
    const ref = { current: null };
    renderHook(() => useResizeObserver(ref, jest.fn()));

    expect(MockResizeObserver.instances).toHaveLength(0);
  });

  it("observes the new element when the target changes", () => {
    const firstElement = document.createElement("div");
    const secondElement = document.createElement("div");

    const { rerender } = renderHook(({ target }) => useResizeObserver(target, jest.fn()), {
      initialProps: { target: firstElement as Element },
    });

    rerender({ target: secondElement });

    expect(MockResizeObserver.instances).toHaveLength(2);
    // The old observer is disconnected
    expect(MockResizeObserver.instances[0].disconnected).toBe(true);
    // The new observer observes the new element
    expect(MockResizeObserver.instances[1].observed).toContain(secondElement);
  });

  it("supports a ref-form target", () => {
    const element = document.createElement("div");
    const ref = { current: element };
    const listener = jest.fn();

    renderHook(() => useResizeObserver(ref, listener));

    expect(MockResizeObserver.instances).toHaveLength(1);
    expect(MockResizeObserver.instances[0].observed).toContain(element);
  });

  it("uses the latest function after the listener updates", () => {
    const element = document.createElement("div");
    const first = jest.fn();

    const { rerender } = renderHook(({ listener }) => useResizeObserver(element, listener), {
      initialProps: { listener: first },
    });

    const latest = jest.fn();
    rerender({ listener: latest });

    MockResizeObserver.instances[0].trigger(element);

    expect(first).not.toHaveBeenCalled();
    expect(latest).toHaveBeenCalledTimes(1);
  });
});
