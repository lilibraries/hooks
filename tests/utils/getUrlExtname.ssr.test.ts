/**
 * @jest-environment node
 */

import getUrlExtname from "../../src/utils/getUrlExtname";

describe("getUrlExtname (SSR)", () => {
  it("returns an empty string for relative urls outside the browser", () => {
    expect(getUrlExtname("/static/app.js")).toBe("");
    expect(getUrlExtname("static/app.js")).toBe("");
  });
});
