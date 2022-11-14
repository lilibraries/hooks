import { getExtname } from "@lilib/hooks";

describe("utils/getExtname", () => {
  it("should get extname of url correctly, and convert it to lowercase", () => {
    expect(
      getExtname("http://example.com/pathname.ExtName?search.search#hash.hash")
    ).toBe("extname");
  });
});
