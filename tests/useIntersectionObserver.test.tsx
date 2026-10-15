import renderHook from "./helpers/renderHook";

import useIntersectionObserver from "../src/useIntersectionObserver";

import { MockIntersectionObserver } from "./helpers/mocks";

describe("useIntersectionObserver", () => {
  it("creates an IntersectionObserver and observes the target on mount", () => {
    const element = document.createElement("div");
    const listener = jest.fn();

    renderHook(() => useIntersectionObserver(element, listener));

    expect(MockIntersectionObserver.instances).toHaveLength(1);
    expect(MockIntersectionObserver.instances[0].observed).toContain(element);
  });

  it("fires the listener when the intersection state changes", () => {
    const element = document.createElement("div");
    const listener = jest.fn();

    renderHook(() => useIntersectionObserver(element, listener));

    MockIntersectionObserver.instances[0].trigger(true, element);
    expect(listener).toHaveBeenCalledTimes(1);

    MockIntersectionObserver.instances[0].trigger(false, element);
    expect(listener).toHaveBeenCalledTimes(2);
  });

  it("forwards the root, rootMargin, and threshold options", () => {
    const element = document.createElement("div");
    const rootElement = document.createElement("div");

    renderHook(() =>
      useIntersectionObserver(element, jest.fn(), {
        root: rootElement,
        rootMargin: "10px",
        threshold: 0.5,
      }),
    );

    const options = MockIntersectionObserver.instances[0].options;
    expect(options.root).toBe(rootElement);
    expect(options.rootMargin).toBe("10px");
    expect(options.threshold).toBe(0.5);
  });

  it("disconnects the observer on unmount", () => {
    const element = document.createElement("div");
    const { unmount } = renderHook(() => useIntersectionObserver(element, jest.fn()));

    unmount();

    expect(MockIntersectionObserver.instances[0].disconnected).toBe(true);
  });

  it("does not create an observer when the target is null", () => {
    const ref = { current: null };
    renderHook(() => useIntersectionObserver(ref, jest.fn()));

    expect(MockIntersectionObserver.instances).toHaveLength(0);
  });

  it("uses the latest function after the listener updates", () => {
    const element = document.createElement("div");
    const first = jest.fn();

    const { rerender } = renderHook(({ listener }) => useIntersectionObserver(element, listener), {
      initialProps: { listener: first },
    });

    const latest = jest.fn();
    rerender({ listener: latest });

    MockIntersectionObserver.instances[0].trigger(true, element);

    expect(first).not.toHaveBeenCalled();
    expect(latest).toHaveBeenCalledTimes(1);
  });
});
