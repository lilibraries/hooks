import "@testing-library/jest-dom";
import "@testing-library/react";

import {
  MockIntersectionObserver,
  MockResizeObserver,
  installIdleCallbackMock,
  installIntersectionObserverMock,
  installMatchMediaMock,
  installRafMock,
  installResizeObserverMock,
  matchMediaMock,
  unstubAllGlobals,
} from "./mocks";

// `@testing-library/react-hooks` registers its auto-cleanup `afterEach` when the module
// loads. Test files load it indirectly through `tests/helpers/renderHook`, i.e. after this
// file's own hooks would already be registered, which would make its cleanup run after
// `unstubAllGlobals` has removed the stubs. Loading it here moves the registration ahead of
// this file's hooks. It is only installed in the React 16/17 test matrices (the 18/19
// matrices use `@testing-library/react`'s own `renderHook`), so guard by `REACT_VERSION`.
if (process.env.REACT_VERSION === "16" || process.env.REACT_VERSION === "17") {
  jest.requireActual("@testing-library/react-hooks");
}

/**
 * Global test environment setup:
 * 1. Polyfill/stub browser APIs (rAF, requestIdleCallback, matchMedia, IntersectionObserver, ResizeObserver).
 *    These stubs are all built on `setTimeout`, so they are fully controllable with fake timers.
 * 2. Packages such as `raf`, `requestidlecallback`, `resize-observer-polyfill`, and
 *    `intersection-observer` read and cache global API references **at module load time**,
 *    so the stubs must be installed at the top level of this setup file (before the
 *    test files' module graph loads), otherwise they fall back to their internal polyfills.
 * 3. Installation must happen at the top level of the setup file; `beforeEach` only resets
 *    mock state and refreshes stub references.
 */

installRafMock();
installIdleCallbackMock();
installMatchMediaMock();
installIntersectionObserverMock();
installResizeObserverMock();

beforeEach(() => {
  // Refresh stub and mock state before each test case (cached references held by modules are unaffected)
  installRafMock();
  installIdleCallbackMock();
  installMatchMediaMock();
  installIntersectionObserverMock();
  installResizeObserverMock();
  matchMediaMock.instances = [];
  MockIntersectionObserver.reset();
  MockResizeObserver.reset();

  // DOM-dependent state only exists in jsdom; SSR test files run in a plain
  // Node environment where `window` and `document` are undefined
  if (typeof window !== "undefined") {
    // jsdom lacks visualViewport, provide a minimal EventTarget-based implementation
    // (does not affect hooks that do not use it)
    const viewport = new EventTarget();
    Object.assign(viewport, { width: 1024, height: 768 });
    Object.defineProperty(window, "visualViewport", {
      configurable: true,
      value: viewport,
    });

    // Restore jsdom default state that may have been modified by other test cases
    document.title = "";
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      value: "visible",
    });
    document.head.querySelectorAll("link[rel*='icon']").forEach((link) => link.remove());
  }
});

afterEach(() => {
  MockIntersectionObserver.reset();
  MockResizeObserver.reset();
  unstubAllGlobals();
});
