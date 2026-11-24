import isPageScroller from "../../src/utils/isPageScroller";

describe("isPageScroller", () => {
  it("accepts the document's scrolling element", () => {
    expect(isPageScroller(document.documentElement)).toBe(true);
  });

  it("rejects nested elements", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);

    expect(isPageScroller(element)).toBe(false);
    expect(isPageScroller(document.body)).toBe(false);

    element.remove();
  });

  it("rejects detached elements", () => {
    expect(isPageScroller(document.createElement("div"))).toBe(false);
  });
});
