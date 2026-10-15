/**
 * @jest-environment node
 */

import isPageVisible from "../../src/utils/isPageVisible";

describe("isPageVisible (SSR)", () => {
  it("returns true outside the browser", () => {
    expect(isPageVisible()).toBe(true);
  });
});
