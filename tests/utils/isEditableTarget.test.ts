import isEditableTarget from "../../src/utils/isEditableTarget";

describe("isEditableTarget", () => {
  it("returns true for text-like inputs", () => {
    const input = document.createElement("input");
    expect(isEditableTarget(input)).toBe(true);

    input.setAttribute("type", "search");
    expect(isEditableTarget(input)).toBe(true);

    input.setAttribute("type", "number");
    expect(isEditableTarget(input)).toBe(true);
  });

  it("returns false for inputs that do not accept text", () => {
    const input = document.createElement("input");

    for (const type of ["checkbox", "radio", "button", "submit", "range", "file"]) {
      input.setAttribute("type", type);
      expect(isEditableTarget(input)).toBe(false);
    }
  });

  it("returns true for textarea and select", () => {
    expect(isEditableTarget(document.createElement("textarea"))).toBe(true);
    expect(isEditableTarget(document.createElement("select"))).toBe(true);
  });

  it("returns true inside a content-editable element", () => {
    const editable = document.createElement("div");
    editable.setAttribute("contenteditable", "true");
    const child = document.createElement("span");
    editable.appendChild(child);

    expect(isEditableTarget(editable)).toBe(true);
    expect(isEditableTarget(child)).toBe(true);
  });

  it("returns false for content-editable disabled subtrees", () => {
    const element = document.createElement("div");
    element.setAttribute("contenteditable", "false");
    expect(isEditableTarget(element)).toBe(false);

    // The attribute value is case-insensitive
    element.setAttribute("contenteditable", "FALSE");
    expect(isEditableTarget(element)).toBe(false);
  });

  it("returns false for a disabled island inside an editable region", () => {
    const region = document.createElement("div");
    region.setAttribute("contenteditable", "true");
    const island = document.createElement("div");
    island.setAttribute("contenteditable", "false");
    const child = document.createElement("span");
    island.appendChild(child);
    region.appendChild(island);

    expect(isEditableTarget(region)).toBe(true);
    expect(isEditableTarget(island)).toBe(false);
    expect(isEditableTarget(child)).toBe(false);
  });

  it("defers content-editable inherit to the ancestor", () => {
    const region = document.createElement("div");
    region.setAttribute("contenteditable", "true");
    const child = document.createElement("span");
    child.setAttribute("contenteditable", "inherit");
    region.appendChild(child);

    expect(isEditableTarget(child)).toBe(true);

    const detached = document.createElement("span");
    detached.setAttribute("contenteditable", "inherit");
    expect(isEditableTarget(detached)).toBe(false);
  });

  it("returns false for other targets", () => {
    expect(isEditableTarget(null)).toBe(false);
    expect(isEditableTarget(document)).toBe(false);
    expect(isEditableTarget(document.createElement("div"))).toBe(false);
  });
});
