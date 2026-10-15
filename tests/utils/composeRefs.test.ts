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
