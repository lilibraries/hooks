import React, { StrictMode } from "react";
import type { ReactNode } from "react";

import { act } from "@testing-library/react";
import renderHook from "./helpers/renderHook";

import useFullscreen from "../src/useFullscreen";

function StrictWrapper({ children }: { children?: ReactNode }) {
  return React.createElement(StrictMode, null, children);
}

// `reactStrictMode` is only read by @testing-library/react-hooks (React 16/17)
const strictOptions = { wrapper: StrictWrapper, reactStrictMode: true };

interface PrefixedDocument extends Document {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => void;
  mozFullScreenElement?: Element | null;
  mozCancelFullScreen?: () => void;
}

interface PrefixedElement extends Element {
  webkitRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
}

let fullscreenElement: Element | null = null;
let requestFullscreen: jest.Mock;
let exitFullscreen: jest.Mock;

function dispatchChange(eventName = "fullscreenchange", doc: Document = document) {
  doc.dispatchEvent(new Event(eventName));
}

function setFullscreen(element: Element | null, eventName?: string, doc?: Document) {
  fullscreenElement = element;
  dispatchChange(eventName, doc);
}

// jsdom implements no part of the Fullscreen API, so it is emulated here.
function installFullscreen() {
  fullscreenElement = null;

  requestFullscreen = jest.fn(function (this: Element) {
    setFullscreen(this);
    return Promise.resolve();
  });
  exitFullscreen = jest.fn(() => {
    setFullscreen(null);
    return Promise.resolve();
  });

  Object.defineProperty(Element.prototype, "requestFullscreen", {
    configurable: true,
    writable: true,
    value: requestFullscreen,
  });
  Object.defineProperty(document, "exitFullscreen", {
    configurable: true,
    writable: true,
    value: exitFullscreen,
  });
  Object.defineProperty(document, "fullscreenElement", {
    configurable: true,
    get: () => fullscreenElement,
  });
}

function removeFullscreen() {
  fullscreenElement = null;
  Reflect.deleteProperty(Element.prototype, "requestFullscreen");
  Reflect.deleteProperty(document, "exitFullscreen");
  Reflect.deleteProperty(document, "fullscreenElement");
}

function changeFullscreen(element: Element | null, eventName?: string) {
  act(() => setFullscreen(element, eventName));
}

type FullscreenResult = readonly [
  fullscreen: boolean,
  actions: {
    enter: () => Promise<boolean>;
    exit: () => Promise<boolean>;
    toggle: () => Promise<boolean>;
  },
];

async function runAction(
  result: { current: FullscreenResult },
  action: "enter" | "exit" | "toggle",
) {
  let succeeded: boolean | undefined;

  await act(async () => {
    succeeded = await result.current[1][action]();
  });

  return succeeded;
}

describe("useFullscreen", () => {
  beforeEach(() => {
    installFullscreen();
  });

  afterEach(() => {
    removeFullscreen();
  });

  it("tracks the whole page by default", async () => {
    const { result } = renderHook(() => useFullscreen());

    expect(result.current[0]).toBe(false);

    expect(await runAction(result, "enter")).toBe(true);
    expect(requestFullscreen).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toBe(true);

    expect(await runAction(result, "exit")).toBe(true);
    expect(exitFullscreen).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toBe(false);
  });

  it("tracks and controls the element the ref points to", async () => {
    const element = document.createElement("div");
    document.body.appendChild(element);
    const ref = { current: element as Element | null };

    const { result } = renderHook(() => useFullscreen(ref));
    expect(result.current[0]).toBe(false);

    await runAction(result, "enter");
    expect(fullscreenElement).toBe(element);
    expect(result.current[0]).toBe(true);

    await runAction(result, "exit");
    expect(fullscreenElement).toBeNull();
    expect(result.current[0]).toBe(false);

    document.body.removeChild(element);
  });

  it("follows the fullscreen changes made outside the hook", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);
    const ref = { current: element as Element | null };

    const { result } = renderHook(() => useFullscreen(ref));

    changeFullscreen(element);
    expect(result.current[0]).toBe(true);

    changeFullscreen(null);
    expect(result.current[0]).toBe(false);

    document.body.removeChild(element);
  });

  it("exits fullscreen only when the target owns the session", async () => {
    const element = document.createElement("div");
    const other = document.createElement("span");
    document.body.append(element, other);
    const ref = { current: element as Element | null };

    const { result } = renderHook(() => useFullscreen(ref));

    changeFullscreen(other);
    expect(result.current[0]).toBe(false);

    expect(await runAction(result, "exit")).toBe(true);
    expect(exitFullscreen).not.toHaveBeenCalled();
    expect(fullscreenElement).toBe(other);

    changeFullscreen(null);
    document.body.removeChild(element);
    document.body.removeChild(other);
  });

  it("toggles between entering and exiting", async () => {
    const { result } = renderHook(() => useFullscreen());

    expect(await runAction(result, "toggle")).toBe(true);
    expect(result.current[0]).toBe(true);

    expect(await runAction(result, "toggle")).toBe(true);
    expect(result.current[0]).toBe(false);
  });

  it("resolves false and keeps the state when the request is rejected", async () => {
    requestFullscreen.mockRejectedValue(new Error("denied"));

    const { result } = renderHook(() => useFullscreen());

    expect(await runAction(result, "enter")).toBe(false);
    expect(result.current[0]).toBe(false);
  });

  it("resolves false when the request throws synchronously", async () => {
    requestFullscreen.mockImplementation(() => {
      throw new Error("boom");
    });

    const { result } = renderHook(() => useFullscreen());

    expect(await runAction(result, "enter")).toBe(false);
    expect(result.current[0]).toBe(false);
  });

  it("resolves false when the Fullscreen API is unavailable", async () => {
    Reflect.deleteProperty(Element.prototype, "requestFullscreen");
    Reflect.deleteProperty(document, "exitFullscreen");

    const { result } = renderHook(() => useFullscreen());

    expect(await runAction(result, "enter")).toBe(false);
    expect(await runAction(result, "toggle")).toBe(false);

    // The target is not fullscreen, so there is nothing to exit.
    expect(await runAction(result, "exit")).toBe(true);

    // A fullscreen target without an exit implementation cannot be exited.
    changeFullscreen(document.documentElement);
    expect(result.current[0]).toBe(true);
    expect(await runAction(result, "exit")).toBe(false);

    changeFullscreen(null);
    expect(result.current[0]).toBe(false);
  });

  it("tracks nothing when the target is null", async () => {
    const { result } = renderHook(() => useFullscreen(null));

    expect(result.current[0]).toBe(false);
    expect(await runAction(result, "enter")).toBe(false);
    expect(await runAction(result, "exit")).toBe(false);
    expect(await runAction(result, "toggle")).toBe(false);
    expect(requestFullscreen).not.toHaveBeenCalled();
  });

  it("tracks the element a ref points to once it is assigned", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);
    const ref: { current: Element | null } = { current: null };

    const { result, rerender } = renderHook(() => useFullscreen(ref));
    expect(result.current[0]).toBe(false);

    act(() => {
      fullscreenElement = element;
      ref.current = element;
    });
    rerender();
    expect(result.current[0]).toBe(true);

    act(() => {
      fullscreenElement = null;
    });
    document.body.removeChild(element);
  });

  it("supports the prefixed API", async () => {
    Reflect.deleteProperty(Element.prototype, "requestFullscreen");
    Reflect.deleteProperty(document, "exitFullscreen");
    Reflect.deleteProperty(document, "fullscreenElement");

    const doc = document as PrefixedDocument;
    const elementPrototype = Element.prototype as PrefixedElement;

    Object.defineProperty(elementPrototype, "webkitRequestFullscreen", {
      configurable: true,
      writable: true,
      value: jest.fn(function (this: Element) {
        setFullscreen(this, "webkitfullscreenchange");
      }),
    });
    Object.defineProperty(doc, "webkitFullscreenElement", {
      configurable: true,
      get: () => fullscreenElement,
    });
    Object.defineProperty(doc, "webkitExitFullscreen", {
      configurable: true,
      writable: true,
      value: jest.fn(() => {
        setFullscreen(null, "webkitfullscreenchange");
      }),
    });

    try {
      const { result } = renderHook(() => useFullscreen());

      expect(await runAction(result, "enter")).toBe(true);
      expect(result.current[0]).toBe(true);

      expect(await runAction(result, "exit")).toBe(true);
      expect(result.current[0]).toBe(false);
    } finally {
      Reflect.deleteProperty(elementPrototype, "webkitRequestFullscreen");
      Reflect.deleteProperty(doc, "webkitFullscreenElement");
      Reflect.deleteProperty(doc, "webkitExitFullscreen");
    }
  });

  it("supports the moz prefixed API", async () => {
    Reflect.deleteProperty(Element.prototype, "requestFullscreen");
    Reflect.deleteProperty(document, "exitFullscreen");
    Reflect.deleteProperty(document, "fullscreenElement");

    const doc = document as PrefixedDocument;
    const elementPrototype = Element.prototype as PrefixedElement;

    Object.defineProperty(elementPrototype, "mozRequestFullScreen", {
      configurable: true,
      writable: true,
      value: jest.fn(function (this: Element) {
        setFullscreen(this, "mozfullscreenchange");
      }),
    });
    Object.defineProperty(doc, "mozFullScreenElement", {
      configurable: true,
      get: () => fullscreenElement,
    });
    Object.defineProperty(doc, "mozCancelFullScreen", {
      configurable: true,
      writable: true,
      value: jest.fn(() => {
        setFullscreen(null, "mozfullscreenchange");
      }),
    });

    try {
      const { result } = renderHook(() => useFullscreen());

      expect(await runAction(result, "enter")).toBe(true);
      expect(result.current[0]).toBe(true);

      expect(await runAction(result, "exit")).toBe(true);
      expect(result.current[0]).toBe(false);
    } finally {
      Reflect.deleteProperty(elementPrototype, "mozRequestFullScreen");
      Reflect.deleteProperty(doc, "mozFullScreenElement");
      Reflect.deleteProperty(doc, "mozCancelFullScreen");
    }
  });

  it("moves the listeners to the target's document", () => {
    const otherDocument = document.implementation.createHTMLDocument("other");
    const element = otherDocument.createElement("div");
    otherDocument.body.appendChild(element);

    Object.defineProperty(otherDocument, "fullscreenElement", {
      configurable: true,
      get: () => fullscreenElement,
    });

    const { result, rerender } = renderHook(
      ({ target }: { target: Element }) => useFullscreen(target),
      { initialProps: { target: document.documentElement } },
    );
    const removeSpy = jest.spyOn(document, "removeEventListener");

    try {
      // The change happens in another document, which the hook does not track yet.
      act(() => setFullscreen(element, undefined, otherDocument));
      expect(result.current[0]).toBe(false);

      rerender({ target: element });
      expect(removeSpy).toHaveBeenCalledWith(
        "fullscreenchange",
        expect.any(Function),
        expect.anything(),
      );
      expect(result.current[0]).toBe(true);

      act(() => setFullscreen(null, undefined, otherDocument));
      expect(result.current[0]).toBe(false);
    } finally {
      removeSpy.mockRestore();
    }
  });

  it("keeps the actions identity stable", () => {
    const { result, rerender } = renderHook(() => useFullscreen());
    const actions = result.current[1];

    rerender();
    expect(result.current[1]).toBe(actions);
  });

  it("removes the listeners on unmount and leaves fullscreen alone", async () => {
    const { result, unmount } = renderHook(() => useFullscreen());

    await runAction(result, "enter");
    expect(result.current[0]).toBe(true);

    const removeSpy = jest.spyOn(document, "removeEventListener");

    try {
      unmount();
      expect(removeSpy).toHaveBeenCalledWith(
        "fullscreenchange",
        expect.any(Function),
        expect.anything(),
      );
      expect(exitFullscreen).not.toHaveBeenCalled();
      expect(fullscreenElement).toBe(document.documentElement);
    } finally {
      removeSpy.mockRestore();
    }
  });

  it("works under StrictMode", async () => {
    const addSpy = jest.spyOn(document, "addEventListener");
    const removeSpy = jest.spyOn(document, "removeEventListener");
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    try {
      const { result, unmount } = renderHook(() => useFullscreen(), strictOptions);

      expect(await runAction(result, "enter")).toBe(true);
      expect(result.current[0]).toBe(true);

      unmount();

      const count = (calls: unknown[][]) =>
        calls.filter(([eventName]) => eventName === "fullscreenchange").length;
      expect(count(addSpy.mock.calls)).toBe(count(removeSpy.mock.calls));
      expect(errorSpy).not.toHaveBeenCalled();
    } finally {
      errorSpy.mockRestore();
      addSpy.mockRestore();
      removeSpy.mockRestore();
    }
  });
});
