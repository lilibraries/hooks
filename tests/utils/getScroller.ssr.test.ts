/**
 * @jest-environment node
 */

import getScroller from "../../src/utils/getScroller";

describe("getScroller (SSR)", () => {
  it("tracks nothing outside the browser", () => {
    expect(getScroller()).toBe(null);
    expect(getScroller(null)).toBe(null);
  });
});
