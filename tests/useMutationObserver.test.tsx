import { StrictMode } from "react";

import renderHook from "./helpers/renderHook";

import useMutationObserver from "../src/useMutationObserver";

import { MockMutationObserver } from "./helpers/mocks";

describe("useMutationObserver", () => {
  it("observes the target node on mount", () => {
    const element = document.createElement("div");
    const listener = jest.fn();

    renderHook(() => useMutationObserver(element, listener));

    expect(MockMutationObserver.instances).toHaveLength(1);
    expect(MockMutationObserver.instances[0].observed).toContain(element);
  });

  it("observes child list, attribute and character data mutations by default", () => {
    const element = document.createElement("div");

    renderHook(() => useMutationObserver(element, jest.fn()));

    const options = MockMutationObserver.instances[0].options;
    expect(options.childList).toBe(true);
    expect(options.attributes).toBe(true);
    expect(options.characterData).toBe(true);
    expect(options.subtree).toBeUndefined();
  });

  it("forwards the options", () => {
    const element = document.createElement("div");

    renderHook(() =>
      useMutationObserver(element, jest.fn(), {
        attributes: true,
        attributeFilter: ["class"],
        attributeOldValue: true,
      }),
    );

    const options = MockMutationObserver.instances[0].options;
    expect(options.attributes).toBe(true);
    expect(options.attributeFilter).toEqual(["class"]);
    expect(options.attributeOldValue).toBe(true);
  });

  it("fires the listener on mutations", () => {
    const element = document.createElement("div");
    const listener = jest.fn();

    renderHook(() => useMutationObserver(element, listener));

    MockMutationObserver.instances[0].trigger(element);
    expect(listener).toHaveBeenCalledTimes(1);

    MockMutationObserver.instances[0].trigger(element);
    expect(listener).toHaveBeenCalledTimes(2);
  });

  it("passes the mutation records to the listener", () => {
    const element = document.createElement("div");
    let received: MutationRecord[] = [];
    renderHook(() =>
      useMutationObserver(element, (records) => {
        received = records;
      }),
    );

    MockMutationObserver.instances[0].trigger(element, "attributes");

    expect(received).toHaveLength(1);
    expect(received[0].target).toBe(element);
    expect(received[0].type).toBe("attributes");
  });

  it("disconnects the observer on unmount", () => {
    const element = document.createElement("div");
    const { unmount } = renderHook(() => useMutationObserver(element, jest.fn()));

    unmount();

    expect(MockMutationObserver.instances[0].disconnected).toBe(true);
  });

  it("does not create an observer when the target is null", () => {
    const ref = { current: null };
    renderHook(() => useMutationObserver(ref, jest.fn()));

    expect(MockMutationObserver.instances).toHaveLength(0);
  });

  it("observes the new node when the target changes", () => {
    const firstElement = document.createElement("div");
    const secondElement = document.createElement("div");

    const { rerender } = renderHook(({ target }) => useMutationObserver(target, jest.fn()), {
      initialProps: { target: firstElement as Node },
    });

    rerender({ target: secondElement });

    expect(MockMutationObserver.instances).toHaveLength(2);
    // The old observer is disconnected
    expect(MockMutationObserver.instances[0].disconnected).toBe(true);
    // The new observer observes the new node
    expect(MockMutationObserver.instances[1].observed).toContain(secondElement);
  });

  it("supports a ref-form target", () => {
    const element = document.createElement("div");
    const ref = { current: element };
    const listener = jest.fn();

    renderHook(() => useMutationObserver(ref, listener));

    expect(MockMutationObserver.instances).toHaveLength(1);
    expect(MockMutationObserver.instances[0].observed).toContain(element);
  });

  it("uses the latest function after the listener updates", () => {
    const element = document.createElement("div");
    const first = jest.fn();

    const { rerender } = renderHook(({ listener }) => useMutationObserver(element, listener), {
      initialProps: { listener: first },
    });

    const latest = jest.fn();
    rerender({ listener: latest });

    MockMutationObserver.instances[0].trigger(element);

    expect(first).not.toHaveBeenCalled();
    expect(latest).toHaveBeenCalledTimes(1);
  });

  it("does not recreate the observer when inline options keep the same values", () => {
    const element = document.createElement("div");

    const { rerender } = renderHook(
      ({ filter }) =>
        useMutationObserver(element, jest.fn(), { attributes: true, attributeFilter: filter }),
      { initialProps: { filter: ["class"] } },
    );

    rerender({ filter: ["class"] });

    expect(MockMutationObserver.instances).toHaveLength(1);
  });

  it("recreates the observer when the attributeFilter content changes", () => {
    const element = document.createElement("div");

    const { rerender } = renderHook(
      ({ filter }) =>
        useMutationObserver(element, jest.fn(), { attributes: true, attributeFilter: filter }),
      { initialProps: { filter: ["class"] } },
    );

    rerender({ filter: ["style"] });

    expect(MockMutationObserver.instances).toHaveLength(2);
    expect(MockMutationObserver.instances[0].disconnected).toBe(true);
    expect(MockMutationObserver.instances[1].options.attributeFilter).toEqual(["style"]);
  });

  it("keeps a single active observer under StrictMode", () => {
    const element = document.createElement("div");
    const listener = jest.fn();
    const { unmount } = renderHook(() => useMutationObserver(element, listener), {
      wrapper: StrictMode,
    });

    const active = MockMutationObserver.instances.filter((observer) => !observer.disconnected);
    expect(active).toHaveLength(1);
    expect(active[0].observed).toContain(element);

    active[0].trigger(element);
    expect(listener).toHaveBeenCalledTimes(1);

    unmount();
    expect(MockMutationObserver.instances.every((observer) => observer.disconnected)).toBe(true);
  });
});
