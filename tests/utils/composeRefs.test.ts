import composeRefs from "../../src/utils/composeRefs";

describe("composeRefs", () => {
  it("updates both an object ref and a callback ref", () => {
    const objectRef = { current: null as HTMLDivElement | null };
    const callbackRef = jest.fn();
    const composed = composeRefs<HTMLDivElement>(objectRef, callbackRef);

    const element = document.createElement("div");
    composed(element);

    expect(objectRef.current).toBe(element);
    expect(callbackRef).toHaveBeenCalledWith(element);
  });

  it("returns undefined when no callback provides cleanup", () => {
    const objectRef = { current: null as HTMLDivElement | null };
    const callbackRef = jest.fn();
    const composed = composeRefs<HTMLDivElement>(objectRef, callbackRef, null, undefined);

    expect(composed(document.createElement("div"))).toBeUndefined();
    expect(composed(null)).toBeUndefined();
    expect(composeRefs<HTMLDivElement>()(null)).toBeUndefined();
  });

  it("combines cleanup functions with legacy callbacks and object refs", () => {
    const cleanupA = jest.fn();
    const cleanupB = jest.fn();
    const callbackA = jest.fn(() => cleanupA);
    const callbackB = jest.fn(() => cleanupB);
    const legacyCallback = jest.fn();
    const objectA = { current: null as HTMLDivElement | null };
    const objectB = { current: null as HTMLDivElement | null };
    const composed = composeRefs<HTMLDivElement>(
      callbackA,
      objectA,
      null,
      legacyCallback,
      undefined,
      callbackB,
      objectB,
    );
    const element = document.createElement("div");

    const cleanup = composed(element);

    expect(cleanup).toEqual(expect.any(Function));
    expect(callbackA).toHaveBeenCalledWith(element);
    expect(callbackB).toHaveBeenCalledWith(element);
    expect(legacyCallback).toHaveBeenCalledWith(element);
    expect(objectA.current).toBe(element);
    expect(objectB.current).toBe(element);
    expect(cleanupA).not.toHaveBeenCalled();
    expect(cleanupB).not.toHaveBeenCalled();

    cleanup?.();

    expect(cleanupA).toHaveBeenCalledTimes(1);
    expect(cleanupB).toHaveBeenCalledTimes(1);
    expect(callbackA).toHaveBeenCalledTimes(1);
    expect(callbackB).toHaveBeenCalledTimes(1);
    expect(legacyCallback.mock.calls).toEqual([[element], [null]]);
    expect(objectA.current).toBeNull();
    expect(objectB.current).toBeNull();
  });

  it("captures fresh cleanup functions for each attachment", () => {
    const cleanupA = jest.fn();
    const cleanupB = jest.fn();
    const callbackRef = jest.fn().mockReturnValueOnce(cleanupA).mockReturnValueOnce(cleanupB);
    const legacyCallback = jest.fn();
    const objectRef = { current: null as HTMLDivElement | null };
    const composed = composeRefs<HTMLDivElement>(callbackRef, legacyCallback, objectRef);
    const element = document.createElement("div");

    const firstCleanup = composed(element);
    expect(firstCleanup).toEqual(expect.any(Function));
    firstCleanup?.();
    expect(cleanupA).toHaveBeenCalledTimes(1);
    expect(cleanupB).not.toHaveBeenCalled();
    expect(objectRef.current).toBeNull();

    const secondCleanup = composed(element);
    expect(secondCleanup).toEqual(expect.any(Function));
    expect(secondCleanup).not.toBe(firstCleanup);
    expect(objectRef.current).toBe(element);
    secondCleanup?.();

    expect(cleanupA).toHaveBeenCalledTimes(1);
    expect(cleanupB).toHaveBeenCalledTimes(1);
    expect(callbackRef.mock.calls).toEqual([[element], [element]]);
    expect(legacyCallback.mock.calls).toEqual([[element], [null], [element], [null]]);
    expect(objectRef.current).toBeNull();
  });

  it("does not treat non-function callback return values as cleanup", () => {
    const callbackRef = jest.fn(() => 42) as any;
    const composed = composeRefs<HTMLDivElement>(callbackRef);

    expect(composed(document.createElement("div"))).toBeUndefined();
    expect(composed(null)).toBeUndefined();
    expect(callbackRef).toHaveBeenLastCalledWith(null);
  });

  it("clears every ref when null is passed", () => {
    const objectRef = { current: null as HTMLDivElement | null };
    const callbackRef = jest.fn();
    const composed = composeRefs<HTMLDivElement>(objectRef, callbackRef);

    const element = document.createElement("div");
    composed(element);
    composed(null);

    expect(objectRef.current).toBeNull();
    expect(callbackRef).toHaveBeenLastCalledWith(null);
  });

  it("ignores null and undefined refs", () => {
    const callbackRef = jest.fn();
    const composed = composeRefs<HTMLDivElement>(null, undefined, callbackRef);

    const element = document.createElement("div");
    expect(() => composed(element)).not.toThrow();
    expect(callbackRef).toHaveBeenCalledTimes(1);
    expect(callbackRef).toHaveBeenCalledWith(element);
  });

  it("updates every object ref in the list", () => {
    const refA = { current: null as HTMLDivElement | null };
    const refB = { current: null as HTMLDivElement | null };
    const composed = composeRefs<HTMLDivElement>(refA, refB);

    const element = document.createElement("div");
    composed(element);

    expect(refA.current).toBe(element);
    expect(refB.current).toBe(element);
  });

  it("ignores refs that are neither functions nor ref objects", () => {
    const composed = composeRefs<HTMLDivElement>("text" as any, 42 as any);

    expect(() => composed(document.createElement("div"))).not.toThrow();
  });

  it("ignores plain objects without a current property", () => {
    const composed = composeRefs<HTMLDivElement>({} as any);

    expect(() => composed(document.createElement("div"))).not.toThrow();
  });
});
