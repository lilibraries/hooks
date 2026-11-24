import isRtl from "../../src/utils/isRtl";

describe("isRtl", () => {
  it("reads the computed direction of the element", () => {
    const element = document.createElement("div");
    document.body.appendChild(element);

    expect(isRtl(element)).toBe(false);

    element.style.direction = "rtl";
    expect(isRtl(element)).toBe(true);

    element.style.direction = "ltr";
    expect(isRtl(element)).toBe(false);

    element.remove();
  });

  it("reads the resolved direction of an element without styles", () => {
    document.body.style.direction = "rtl";

    expect(isRtl(document.body)).toBe(true);

    document.body.style.direction = "";
  });
});
