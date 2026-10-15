import renderHook from "./helpers/renderHook";

import useTitle from "../src/useTitle";

describe("useTitle", () => {
  it("sets the document title", () => {
    renderHook(() => useTitle("My Page"));

    expect(document.title).toBe("My Page");
  });

  it("updates the title when it changes", () => {
    const { rerender } = renderHook(({ title }) => useTitle(title), {
      initialProps: { title: "First" },
    });

    expect(document.title).toBe("First");

    rerender({ title: "Second" });
    expect(document.title).toBe("Second");
  });

  it("does not set the title when it is null", () => {
    document.title = "original";
    renderHook(() => useTitle(null));

    expect(document.title).toBe("original");
  });

  it("restores the previous title on unmount when restore: true", () => {
    document.title = "original";
    const { unmount } = renderHook(() => useTitle("changed", { restore: true }));

    expect(document.title).toBe("changed");

    unmount();
    expect(document.title).toBe("original");
  });

  it("does not restore on unmount when restore is not set", () => {
    document.title = "original";
    const { unmount } = renderHook(() => useTitle("changed"));

    unmount();
    expect(document.title).toBe("changed");
  });
});
