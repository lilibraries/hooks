import { useMemo } from "react";
import useUnmount from "./useUnmount";
import usePreviousRef from "./usePreviousRef";
import extname from "./utils/extname";
import inBrowser from "./utils/inBrowser";

const mimes = {
  ico: "image/x-icon",
  png: "image/png",
  gif: "image/gif",
};

function getHead() {
  if (inBrowser) {
    return document.getElementsByTagName("head")[0];
  }
}

function getLink() {
  if (inBrowser) {
    return document.querySelector("link[rel*='icon']") as HTMLLinkElement;
  }
}

function useFavicon(
  href: string,
  options?: { mime?: string; restore?: boolean }
) {
  const { mime, restore } = options || {};
  const prevHrefRef = usePreviousRef(href);

  const oldIconData = useMemo(() => {
    if (inBrowser) {
      const link = getLink();
      if (link) {
        return { type: link.type, rel: link.rel, href: link.href };
      }
    }
  }, []);

  if (inBrowser && href && href !== prevHrefRef.current) {
    const link = getLink() || document.createElement("link");

    link.href = href;
    link.rel = "shortcut icon";
    link.type = mime || mimes[extname(href) as keyof typeof mimes] || mimes.ico;

    if (!getLink()) {
      const head = getHead();
      head?.appendChild(link);
    }
  }

  useUnmount(() => {
    if (inBrowser && restore) {
      if (oldIconData === undefined) {
        const head = getHead();
        const link = getLink();
        link && head?.removeChild(link);
      } else {
        const link = getLink();
        if (link) {
          link.type = oldIconData.type;
          link.rel = oldIconData.rel;
          link.href = oldIconData.href;
        }
      }
    }
  });
}

export default useFavicon;
