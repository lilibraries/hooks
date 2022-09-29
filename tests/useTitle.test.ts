import { useTitle } from "@lilib/hooks";
import renderHook from "./helpers/renderHook";

describe("useTitle", () => {
  it("should update document title", () => {
    const { rerender, unmount } = renderHook((title) => useTitle(title), {
      initialProps: "new title",
    });

    expect(document.title).toBe("new title");
    rerender("another new title");
    expect(document.title).toBe("another new title");
    unmount();
    expect(document.title).toBe("another new title");
  });

  it("should restore title on unmount with truthy options.restore", () => {
    document.title = "old title";

    const { rerender, unmount } = renderHook(
      (title) => useTitle(title, { restore: true }),
      { initialProps: "new title" }
    );

    expect(document.title).toBe("new title");
    rerender("another new title");
    expect(document.title).toBe("another new title");
    unmount();
    expect(document.title).toBe("old title");
  });
});
