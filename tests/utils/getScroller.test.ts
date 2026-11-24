import type { RefObject } from "react";

import getScroller from "../../src/utils/getScroller";

describe("getScroller", () => {
  it("falls back to the page scroller", () => {
    expect(getScroller()).toBe(document.scrollingElement || document.documentElement);
  });

  it("tracks nothing when the target is null", () => {
    expect(getScroller(null)).toBe(null);
  });

  it("returns the element itself", () => {
    const element = document.createElement("div");
    expect(getScroller(element)).toBe(element);
  });

  it("dereferences a ref", () => {
    const element = document.createElement("div");
    const ref: RefObject<Element | null> = { current: element };

    expect(getScroller(ref)).toBe(element);

    ref.current = null;
    expect(getScroller(ref)).toBe(null);
  });
});
