import { extname } from "@lilib/hooks";

describe("utils/extname", () => {
  it("should get extname of url correctly, and convert it to lowercase", () => {
    expect(
      extname("http://example.com/pathname.ExtName?search.search#hash.hash")
    ).toBe("extname");
  });
});
