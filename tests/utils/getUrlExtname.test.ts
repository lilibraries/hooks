import getUrlExtname from "../../src/utils/getUrlExtname";

describe("getUrlExtname", () => {
  it("extracts the extension of a full url", () => {
    expect(getUrlExtname("https://example.com/static/app.js")).toBe("js");
  });

  it("returns the extension in lower case", () => {
    expect(getUrlExtname("https://example.com/avatar.PNG")).toBe("png");
  });

  it("resolves relative paths against the current page", () => {
    expect(getUrlExtname("/static/app.css")).toBe("css");
    expect(getUrlExtname("static/app.css")).toBe("css");
  });

  it("ignores the query string and hash", () => {
    expect(getUrlExtname("https://example.com/app.js?version=1")).toBe("js");
    expect(getUrlExtname("https://example.com/app.js#section")).toBe("js");
  });

  it("keeps only the last extension of multi-dot filenames", () => {
    expect(getUrlExtname("https://example.com/archive.tar.gz")).toBe("gz");
  });

  it("returns the suffix of dotfiles", () => {
    expect(getUrlExtname("https://example.com/.gitignore")).toBe("gitignore");
  });

  it("returns an empty string when the filename has no extension", () => {
    expect(getUrlExtname("https://example.com/path/file")).toBe("");
  });

  it("returns an empty string for urls ending with a slash", () => {
    expect(getUrlExtname("https://example.com/path/")).toBe("");
    expect(getUrlExtname("https://example.com")).toBe("");
  });

  it("does not mistake dotted directories for filenames", () => {
    expect(getUrlExtname("https://example.com/v1.0/avatar")).toBe("");
  });

  it("returns an empty string for data and blob urls", () => {
    expect(getUrlExtname("data:image/png;base64,abc")).toBe("");
    expect(getUrlExtname("blob:https://example.com/uuid")).toBe("");
  });

  it("returns an empty string for unparseable urls", () => {
    expect(getUrlExtname("http://")).toBe("");
  });
});
