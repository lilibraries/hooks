import renderHook from "./helpers/renderHook";

import useFavicon from "../src/useFavicon";

function getIconLink() {
  return document.querySelector("link[rel*='icon']") as HTMLLinkElement | null;
}

describe("useFavicon", () => {
  it("creates a link element when no icon exists", () => {
    renderHook(() => useFavicon("/favicon.png"));

    const link = getIconLink();
    expect(link).not.toBeNull();
    expect(link?.href).toContain("/favicon.png");
    expect(link?.rel).toBe("shortcut icon");
    expect(link?.type).toBe("image/png");
  });

  it("infers the MIME type from the extension", () => {
    const { rerender } = renderHook(({ href }) => useFavicon(href), {
      initialProps: { href: "/icon.svg" as string | null },
    });

    expect(getIconLink()?.type).toBe("image/svg+xml");

    rerender({ href: "/icon.ico" });
    expect(getIconLink()?.type).toBe("image/x-icon");
  });

  it("mime option takes precedence over extension inference", () => {
    renderHook(() => useFavicon("/favicon.png", { mime: "image/custom" }));

    expect(getIconLink()?.type).toBe("image/custom");
  });

  it("updates an existing icon link", () => {
    const existing = document.createElement("link");
    existing.rel = "icon";
    existing.href = "/old.png";
    document.head.appendChild(existing);

    renderHook(() => useFavicon("/new.png"));

    const link = getIconLink();
    expect(link).toBe(existing);
    expect(link?.href).toContain("/new.png");
    expect(link?.rel).toBe("shortcut icon");
  });

  it("does nothing when href is null", () => {
    renderHook(() => useFavicon(null));

    expect(getIconLink()).toBeNull();
  });

  it("removes the created link on unmount when restore: true and no icon existed", () => {
    const { unmount } = renderHook(() => useFavicon("/favicon.png", { restore: true }));

    expect(getIconLink()).not.toBeNull();

    unmount();
    expect(getIconLink()).toBeNull();
  });

  it("restores the original icon on unmount when restore: true and an icon existed", () => {
    const existing = document.createElement("link");
    existing.rel = "icon";
    existing.type = "image/png";
    existing.href = "/old.png";
    document.head.appendChild(existing);

    const { unmount } = renderHook(() => useFavicon("/new.png", { restore: true }));
    expect(getIconLink()?.href).toContain("/new.png");

    unmount();
    const link = getIconLink();
    expect(link).toBe(existing);
    expect(link?.href).toContain("/old.png");
    expect(link?.type).toBe("image/png");
  });

  it("keeps the current icon on unmount when restore is not set", () => {
    const { unmount } = renderHook(() => useFavicon("/favicon.png"));

    unmount();
    expect(getIconLink()).not.toBeNull();
  });
});
