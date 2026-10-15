import isPageVisible from "../../src/utils/isPageVisible";

function setVisibilityState(value: "visible" | "hidden") {
  Object.defineProperty(document, "visibilityState", {
    configurable: true,
    value,
  });
}

describe("isPageVisible", () => {
  it("returns true while the page is visible", () => {
    setVisibilityState("visible");
    expect(isPageVisible()).toBe(true);
  });

  it("returns false while the page is hidden", () => {
    setVisibilityState("hidden");
    expect(isPageVisible()).toBe(false);
  });
});
