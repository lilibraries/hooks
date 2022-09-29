import { useFavicon } from "@lilib/hooks";
import renderHook from "./helpers/renderHook";

describe("useFavicon", () => {
  it("should set favicon correctly without original favicon", () => {
    const { rerender, unmount } = renderHook<{ href: string }, any>(
      ({ href }) => useFavicon(href, { restore: true }),
      { initialProps: { href: "/favicon.png" } }
    );
    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;

    expect(link.type).toBe("image/png");
    expect(link.rel).toBe("shortcut icon");
    expect(link.href).toMatch("/favicon.png");

    rerender({ href: "/favicon.svg" });
    expect(link.type).toBe("image/x-icon");
    expect(link.rel).toBe("shortcut icon");
    expect(link.href).toMatch("/favicon.svg");

    unmount();
    expect(document.querySelector("link[rel*='icon']")).toBeNull();
  });

  it("should set favicon correctly with original favicon", () => {
    let link = document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "icon";
    link.href = "/favicon.ico";
    document.head.appendChild(link);

    const { rerender, unmount } = renderHook<{ href: string }, any>(
      ({ href }) => useFavicon(href, { restore: true }),
      { initialProps: { href: "/favicon.png" } }
    );
    link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;

    expect(link.type).toBe("image/png");
    expect(link.rel).toBe("shortcut icon");
    expect(link.href).toMatch("/favicon.png");

    rerender({ href: "/favicon.svg" });
    expect(link.type).toBe("image/x-icon");
    expect(link.rel).toBe("shortcut icon");
    expect(link.href).toMatch("/favicon.svg");

    unmount();
    link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    expect(link.type).toBe("image/x-icon");
    expect(link.rel).toBe("icon");
    expect(link.href).toMatch("/favicon.ico");

    link.remove();
  });
});
