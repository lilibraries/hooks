import isEventTarget from "../../src/utils/isEventTarget";

describe("isEventTarget", () => {
  it("accepts window, document and elements", () => {
    expect(isEventTarget(window)).toBe(true);
    expect(isEventTarget(document)).toBe(true);
    expect(isEventTarget(document.body)).toBe(true);
  });

  it("accepts EventTarget instances", () => {
    expect(isEventTarget(new EventTarget())).toBe(true);
  });

  it("rejects null and undefined", () => {
    expect(isEventTarget(null)).toBe(false);
    expect(isEventTarget(undefined)).toBe(false);
  });

  it("rejects plain objects", () => {
    expect(isEventTarget({})).toBe(false);
    expect(isEventTarget({ addEventListener() {} })).toBe(false);
    expect(isEventTarget({ removeEventListener() {} })).toBe(false);
  });

  it("rejects non-object values", () => {
    expect(isEventTarget(0)).toBe(false);
    expect(isEventTarget("text")).toBe(false);
    expect(isEventTarget(() => {})).toBe(false);
  });

  it("accepts objects that merely duck-type an EventTarget", () => {
    const target = {
      addEventListener: () => {},
      removeEventListener: () => {},
    };
    expect(isEventTarget(target)).toBe(true);
  });
});
