import getScrollListenerTarget from "../../src/utils/getScrollListenerTarget";

describe("getScrollListenerTarget", () => {
  it("returns the window for the page scroller", () => {
    expect(getScrollListenerTarget(document.documentElement)).toBe(window);
  });

  it("returns the element itself for a nested scroller", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);

    expect(getScrollListenerTarget(element)).toBe(element);

    element.remove();
  });
});
