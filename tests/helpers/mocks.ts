/**
 * A collection of test-only mock utilities. All browser API fake implementations
 * live here, are installed globally by `setup.ts`, and can be imported directly
 * by test files (same module singleton).
 */

/* ------------------------------------------------------------------ */
/* Global stub helpers (jest has no built-in equivalent of vitest's `vi.stubGlobal`) */
/* ------------------------------------------------------------------ */

const originalGlobals = new Map<string, PropertyDescriptor | undefined>();

/** Replace a global value, remembering the original for `unstubAllGlobals`. */
export function stubGlobal(name: string, value: unknown) {
  if (!originalGlobals.has(name)) {
    originalGlobals.set(name, Object.getOwnPropertyDescriptor(globalThis, name));
  }
  Object.defineProperty(globalThis, name, {
    configurable: true,
    writable: true,
    value,
  });
}

/** Restore every global replaced by `stubGlobal`. */
export function unstubAllGlobals() {
  originalGlobals.forEach((descriptor, name) => {
    if (descriptor) {
      Object.defineProperty(globalThis, name, descriptor);
    } else {
      delete (globalThis as Record<string, unknown>)[name];
    }
  });
  originalGlobals.clear();
}

/* ------------------------------------------------------------------ */
/* requestAnimationFrame / cancelAnimationFrame (built on setTimeout, controllable with fake timers) */
/* ------------------------------------------------------------------ */

export function installRafMock() {
  const pending = new Map<number, FrameRequestCallback>();
  let nextId = 1;

  const requestAnimationFrame = jest.fn((callback: FrameRequestCallback) => {
    const id = nextId++;
    pending.set(id, callback);
    setTimeout(() => {
      const frameCallback = pending.get(id);
      if (frameCallback) {
        pending.delete(id);
        frameCallback(Date.now());
      }
    }, 16);
    return id;
  });

  const cancelAnimationFrame = jest.fn((id: number) => {
    pending.delete(id);
  });

  stubGlobal("requestAnimationFrame", requestAnimationFrame);
  stubGlobal("cancelAnimationFrame", cancelAnimationFrame);

  return { requestAnimationFrame, cancelAnimationFrame };
}

/* ------------------------------------------------------------------ */
/* requestIdleCallback / cancelIdleCallback (built on setTimeout, controllable with fake timers) */
/* ------------------------------------------------------------------ */

export function installIdleCallbackMock() {
  const requestIdleCallback = jest.fn(
    (callback: IdleRequestCallback, options?: IdleRequestOptions) => {
      const timeout = options?.timeout ?? 0;
      return setTimeout(() => {
        callback({
          didTimeout: false,
          timeRemaining: () => 50,
        } as unknown as IdleDeadline);
      }, timeout) as unknown as number;
    },
  );

  const cancelIdleCallback = jest.fn((id: number) => {
    clearTimeout(id);
  });

  stubGlobal("requestIdleCallback", requestIdleCallback);
  stubGlobal("cancelIdleCallback", cancelIdleCallback);

  return { requestIdleCallback, cancelIdleCallback };
}

/* ------------------------------------------------------------------ */
/* matchMedia */
/* ------------------------------------------------------------------ */

export class MockMediaQueryList {
  matches: boolean;
  readonly media: string;
  private listeners = new Set<(event: MediaQueryListEvent) => void>();

  constructor(media: string, matches = false) {
    this.media = media;
    this.matches = matches;
  }

  addEventListener(type: string, listener: (event: MediaQueryListEvent) => void) {
    if (type === "change") {
      this.listeners.add(listener);
    }
  }

  removeEventListener(type: string, listener: (event: MediaQueryListEvent) => void) {
    if (type === "change") {
      this.listeners.delete(listener);
    }
  }

  addListener(listener: (event: MediaQueryListEvent) => void) {
    this.listeners.add(listener);
  }

  removeListener(listener: (event: MediaQueryListEvent) => void) {
    this.listeners.delete(listener);
  }

  dispatchEvent(event: MediaQueryListEvent) {
    for (const listener of this.listeners) {
      listener.call(this, event);
    }
    return true;
  }

  /** Test helper: change the matching state and broadcast a change event. */
  triggerChange(matches: boolean) {
    this.matches = matches;
    this.dispatchEvent({ matches, media: this.media } as MediaQueryListEvent);
  }
}

export const matchMediaMock = {
  instances: [] as MockMediaQueryList[],
  matchMedia: undefined as unknown as ReturnType<typeof jest.fn>,
};

export function installMatchMediaMock() {
  matchMediaMock.instances = [];
  matchMediaMock.matchMedia = jest.fn((query: string) => {
    const instance = new MockMediaQueryList(query, false);
    matchMediaMock.instances.push(instance);
    return instance;
  });

  stubGlobal("matchMedia", matchMediaMock.matchMedia);
  return matchMediaMock;
}

/* ------------------------------------------------------------------ */
/* IntersectionObserver */
/* ------------------------------------------------------------------ */

export class MockIntersectionObserverEntry {
  readonly target: Element;
  isIntersecting: boolean;
  intersectionRatio: number;
  readonly rootBounds: null;
  readonly boundingClientRect: DOMRectReadOnly;
  readonly intersectionRect: DOMRectReadOnly;
  readonly time: number;

  constructor(target: Element, isIntersecting: boolean) {
    this.target = target;
    this.isIntersecting = isIntersecting;
    this.intersectionRatio = isIntersecting ? 1 : 0;
    this.rootBounds = null;
    this.boundingClientRect = target.getBoundingClientRect();
    this.intersectionRect = target.getBoundingClientRect();
    this.time = Date.now();
  }
}

export class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  readonly callback: IntersectionObserverCallback;
  readonly options: IntersectionObserverInit;
  observed: Element[] = [];
  disconnected = false;

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.options = options || {};
    MockIntersectionObserver.instances.push(this);
  }

  observe(target: Element) {
    if (!this.observed.includes(target)) {
      this.observed.push(target);
    }
  }

  unobserve(target: Element) {
    this.observed = this.observed.filter((item) => item !== target);
  }

  disconnect() {
    this.disconnected = true;
    this.observed = [];
  }

  /** Test helper: invoke the callback manually, simulating an intersection state change. */
  trigger(isIntersecting: boolean, target?: Element) {
    const targets = target ? [target] : this.observed;
    const entries = targets.map((item) => new MockIntersectionObserverEntry(item, isIntersecting));
    this.callback(entries, this as unknown as IntersectionObserver);
  }

  static reset() {
    MockIntersectionObserver.instances = [];
  }
}

export function installIntersectionObserverMock() {
  stubGlobal("IntersectionObserver", MockIntersectionObserver);
  stubGlobal("IntersectionObserverEntry", MockIntersectionObserverEntry);
  return MockIntersectionObserver;
}

/* ------------------------------------------------------------------ */
/* ResizeObserver */
/* ------------------------------------------------------------------ */

export class MockResizeObserver {
  static instances: MockResizeObserver[] = [];

  readonly callback: ResizeObserverCallback;
  observed: Element[] = [];
  disconnected = false;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
    MockResizeObserver.instances.push(this);
  }

  observe(target: Element) {
    if (!this.observed.includes(target)) {
      this.observed.push(target);
    }
  }

  unobserve(target: Element) {
    this.observed = this.observed.filter((item) => item !== target);
  }

  disconnect() {
    this.disconnected = true;
    this.observed = [];
  }

  /** Test helper: invoke the callback manually, simulating a size change. */
  trigger(target?: Element) {
    const targets = target ? [target] : this.observed;
    const entries = targets.map(
      (item) =>
        ({
          target: item,
          contentRect: item.getBoundingClientRect(),
        }) as unknown as ResizeObserverEntry,
    );
    this.callback(entries, this);
  }

  static reset() {
    MockResizeObserver.instances = [];
  }
}

export function installResizeObserverMock() {
  stubGlobal("ResizeObserver", MockResizeObserver);
  return MockResizeObserver;
}

/* ------------------------------------------------------------------ */
/* Common DOM test helpers */
/* ------------------------------------------------------------------ */

/** Set a fixed `getBoundingClientRect` return value for an element. */
export function mockElementRect(element: Element, rect: Partial<DOMRect> = {}) {
  const { x = 0, y = 0, width = 0, height = 0, top = 0, left = 0, right = 0, bottom = 0 } = rect;
  jest.spyOn(element, "getBoundingClientRect").mockReturnValue({
    x,
    y,
    width,
    height,
    top,
    left,
    right,
    bottom,
    toJSON: () => ({}),
  } as DOMRect);
}
