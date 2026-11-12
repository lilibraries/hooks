import React, { StrictMode } from "react";
import type { ReactNode } from "react";

import renderHook from "./helpers/renderHook";

import useScrollLock from "../src/useScrollLock";

function StrictWrapper({ children }: { children?: ReactNode }) {
  return React.createElement(StrictMode, null, children);
}

// `reactStrictMode` is only read by @testing-library/react-hooks (React 16/17)
const strictOptions = { wrapper: StrictWrapper, reactStrictMode: true };

function isLocked(element: Element) {
  const { overflowX, overflowY } = (element as HTMLElement).style;
  return overflowX === "hidden" && overflowY === "hidden";
}

describe("useScrollLock", () => {
  afterEach(() => {
    for (const element of [document.documentElement, document.body]) {
      element.style.overflowX = "";
      element.style.overflowY = "";
      element.style.paddingLeft = "";
      element.style.paddingRight = "";
      element.style.direction = "";
    }
  });

  it("locks the page scroll container by default", () => {
    const { unmount } = renderHook(() => useScrollLock());

    expect(isLocked(document.documentElement)).toBe(true);

    unmount();
    expect(isLocked(document.documentElement)).toBe(false);
  });

  it("restores the previous inline styles on unmount", () => {
    document.documentElement.style.overflowY = "scroll";
    document.documentElement.style.paddingRight = "4px";

    const { unmount } = renderHook(() => useScrollLock());
    expect(isLocked(document.documentElement)).toBe(true);

    unmount();
    expect(document.documentElement.style.overflowY).toBe("scroll");
    expect(document.documentElement.style.paddingRight).toBe("4px");
  });

  it("follows the enabled option", () => {
    const { rerender } = renderHook(
      ({ enabled }: { enabled: boolean }) => useScrollLock({ enabled }),
      { initialProps: { enabled: false } },
    );

    expect(isLocked(document.documentElement)).toBe(false);

    rerender({ enabled: true });
    expect(isLocked(document.documentElement)).toBe(true);

    rerender({ enabled: false });
    expect(isLocked(document.documentElement)).toBe(false);
  });

  it("keeps the element locked until the last instance is unmounted", () => {
    const first = renderHook(() => useScrollLock());
    const second = renderHook(() => useScrollLock());

    first.unmount();
    expect(isLocked(document.documentElement)).toBe(true);

    second.unmount();
    expect(isLocked(document.documentElement)).toBe(false);
  });

  it("locks the given element instead of the page", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);

    const { unmount } = renderHook(() => useScrollLock({ target: element }));

    expect(isLocked(element)).toBe(true);
    expect(isLocked(document.documentElement)).toBe(false);

    unmount();
    expect(isLocked(element)).toBe(false);

    element.remove();
  });

  it("locks the element a ref points to once it is assigned", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);
    const ref: { current: Element | null } = { current: null };

    const { rerender, unmount } = renderHook(() => useScrollLock({ target: ref }));
    expect(isLocked(element)).toBe(false);

    ref.current = element;
    rerender();
    expect(isLocked(element)).toBe(true);

    unmount();
    expect(isLocked(element)).toBe(false);

    element.remove();
  });

  it("moves the lock when the target changes", () => {
    const first = document.createElement("div");
    const second = document.createElement("div");
    document.body.append(first, second);

    const { rerender, unmount } = renderHook(
      ({ target }: { target: Element }) => useScrollLock({ target }),
      { initialProps: { target: first } },
    );

    expect(isLocked(first)).toBe(true);

    rerender({ target: second });
    expect(isLocked(first)).toBe(false);
    expect(isLocked(second)).toBe(true);

    unmount();
    expect(isLocked(second)).toBe(false);

    first.remove();
    second.remove();
  });

  it("locks nothing when the target is null", () => {
    const { unmount } = renderHook(() => useScrollLock({ target: null }));

    expect(isLocked(document.documentElement)).toBe(false);
    expect(isLocked(document.body)).toBe(false);

    unmount();
  });

  it("releases the lock when the target becomes null", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);

    const { rerender, unmount } = renderHook(
      ({ target }: { target: Element | null }) => useScrollLock({ target }),
      { initialProps: { target: element as Element | null } },
    );

    expect(isLocked(element)).toBe(true);

    rerender({ target: null });
    expect(isLocked(element)).toBe(false);

    unmount();
    element.remove();
  });

  it("locks the element reported as the scrolling element", () => {
    Object.defineProperty(document, "scrollingElement", {
      configurable: true,
      value: document.body,
    });

    try {
      const { unmount } = renderHook(() => useScrollLock());

      expect(isLocked(document.body)).toBe(true);
      expect(isLocked(document.documentElement)).toBe(false);

      unmount();
      expect(isLocked(document.body)).toBe(false);
    } finally {
      Reflect.deleteProperty(document, "scrollingElement");
    }
  });

  it("compensates the page scrollbar width and restores it on release", () => {
    const clientWidth = jest
      .spyOn(Element.prototype, "clientWidth", "get")
      .mockImplementation(() =>
        document.documentElement.style.overflowY === "hidden" ? 1024 : 1009,
      );

    try {
      // The page scrollbar is 15px wide before locking (window.innerWidth is 1024)
      const { rerender, unmount } = renderHook(
        ({ enabled }: { enabled: boolean }) => useScrollLock({ enabled }),
        { initialProps: { enabled: true } },
      );

      expect(document.documentElement.style.paddingRight).toBe("15px");

      rerender({ enabled: false });
      expect(document.documentElement.style.paddingRight).toBe("");

      rerender({ enabled: true });
      expect(document.documentElement.style.paddingRight).toBe("15px");

      unmount();
      expect(document.documentElement.style.paddingRight).toBe("");
    } finally {
      clientWidth.mockRestore();
    }
  });

  it("adds the gap to the existing computed padding", () => {
    document.documentElement.style.paddingRight = "8px";
    const clientWidth = jest
      .spyOn(Element.prototype, "clientWidth", "get")
      .mockImplementation(() =>
        document.documentElement.style.overflowY === "hidden" ? 1024 : 1009,
      );

    try {
      const { unmount } = renderHook(() => useScrollLock());

      // 8px from the inline style plus the 15px scrollbar
      expect(document.documentElement.style.paddingRight).toBe("23px");

      unmount();
      expect(document.documentElement.style.paddingRight).toBe("8px");
    } finally {
      clientWidth.mockRestore();
    }
  });

  it("does not compensate twice when two instances lock the same element", () => {
    const clientWidth = jest
      .spyOn(Element.prototype, "clientWidth", "get")
      .mockImplementation(() =>
        document.documentElement.style.overflowY === "hidden" ? 1024 : 1009,
      );

    try {
      const first = renderHook(() => useScrollLock());
      const second = renderHook(() => useScrollLock());

      expect(document.documentElement.style.paddingRight).toBe("15px");

      first.unmount();
      expect(document.documentElement.style.paddingRight).toBe("15px");

      second.unmount();
      expect(document.documentElement.style.paddingRight).toBe("");
    } finally {
      clientWidth.mockRestore();
    }
  });

  it("compensates on the left side in right-to-left layouts", () => {
    document.documentElement.style.direction = "rtl";
    const clientWidth = jest
      .spyOn(Element.prototype, "clientWidth", "get")
      .mockImplementation(() =>
        document.documentElement.style.overflowY === "hidden" ? 1024 : 1009,
      );

    try {
      const { unmount } = renderHook(() => useScrollLock());

      expect(document.documentElement.style.paddingLeft).toBe("15px");
      expect(document.documentElement.style.paddingRight).toBe("");

      unmount();
      expect(document.documentElement.style.paddingLeft).toBe("");
    } finally {
      clientWidth.mockRestore();
    }
  });

  it("compensates the scrollbar of an element used as the scroll container", () => {
    const offsetWidth = jest
      .spyOn(HTMLElement.prototype, "offsetWidth", "get")
      .mockImplementation(() => (document.body.style.overflowY === "hidden" ? 200 : 215));
    const clientWidth = jest.spyOn(Element.prototype, "clientWidth", "get").mockReturnValue(200);

    try {
      const { unmount } = renderHook(() => useScrollLock({ target: document.body }));

      expect(document.body.style.paddingRight).toBe("15px");

      unmount();
      expect(document.body.style.paddingRight).toBe("");
    } finally {
      offsetWidth.mockRestore();
      clientWidth.mockRestore();
    }
  });

  it("compensates the page scrollbar when body's overflow goes to the viewport", () => {
    // `body` has no scrollbar of its own; the page scrollbar disappears because the
    // body's overflow is propagated to the viewport in standards mode.
    Object.defineProperty(document.documentElement, "clientWidth", {
      configurable: true,
      get: () => (document.body.style.overflowY === "hidden" ? 1024 : 1009),
    });
    Object.defineProperty(document.body, "offsetWidth", { configurable: true, get: () => 1009 });
    Object.defineProperty(document.body, "clientWidth", { configurable: true, get: () => 1009 });

    try {
      const { unmount } = renderHook(() => useScrollLock({ target: document.body }));

      expect(document.body.style.paddingRight).toBe("15px");

      unmount();
      expect(document.body.style.paddingRight).toBe("");
    } finally {
      Reflect.deleteProperty(document.documentElement, "clientWidth");
      Reflect.deleteProperty(document.body, "offsetWidth");
      Reflect.deleteProperty(document.body, "clientWidth");
    }
  });

  it("follows the page direction when the page scrollbar disappears", () => {
    document.body.style.direction = "rtl";
    Object.defineProperty(document.documentElement, "clientWidth", {
      configurable: true,
      get: () => (document.body.style.overflowY === "hidden" ? 1024 : 1009),
    });
    Object.defineProperty(document.body, "offsetWidth", { configurable: true, get: () => 1009 });
    Object.defineProperty(document.body, "clientWidth", { configurable: true, get: () => 1009 });

    try {
      const { unmount } = renderHook(() => useScrollLock({ target: document.body }));

      // The page scrollbar follows the root element's direction, not the body's
      expect(document.body.style.paddingRight).toBe("15px");
      expect(document.body.style.paddingLeft).toBe("");

      unmount();
    } finally {
      Reflect.deleteProperty(document.documentElement, "clientWidth");
      Reflect.deleteProperty(document.body, "offsetWidth");
      Reflect.deleteProperty(document.body, "clientWidth");
    }
  });

  it("compensates on the left side of a right-to-left element", () => {
    const element = document.createElement("div");
    element.style.direction = "rtl";
    document.body.appendChild(element);

    const offsetWidth = jest
      .spyOn(HTMLElement.prototype, "offsetWidth", "get")
      .mockImplementation(() => (element.style.overflowY === "hidden" ? 200 : 215));
    const clientWidth = jest.spyOn(Element.prototype, "clientWidth", "get").mockReturnValue(200);

    try {
      const { unmount } = renderHook(() => useScrollLock({ target: element }));

      expect(element.style.paddingLeft).toBe("15px");
      expect(element.style.paddingRight).toBe("");

      unmount();
      expect(element.style.paddingLeft).toBe("");
    } finally {
      offsetWidth.mockRestore();
      clientWidth.mockRestore();
      element.remove();
    }
  });

  it("does not compensate when the scrollbar gutter is stable", () => {
    const clientWidth = jest.spyOn(Element.prototype, "clientWidth", "get").mockReturnValue(1009);

    try {
      const { unmount } = renderHook(() => useScrollLock());
      expect(document.documentElement.style.paddingRight).toBe("");
      unmount();
    } finally {
      clientWidth.mockRestore();
    }
  });

  it("does not leak the lock under StrictMode", () => {
    const { unmount } = renderHook(() => useScrollLock(), strictOptions);

    expect(isLocked(document.documentElement)).toBe(true);

    unmount();
    expect(isLocked(document.documentElement)).toBe(false);
  });
});
