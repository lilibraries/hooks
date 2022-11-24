import getUrlExtname from "../../src/utils/getUrlExtname";

describe("utils/getUrlExtname", () => {
  it("should get extname of url correctly, and convert it to lowercase", () => {
    expect(
      getUrlExtname(
        "http://example.com/pathname.ExtName?search.search#hash.hash"
      )
    ).toBe("extname");
  });
});
