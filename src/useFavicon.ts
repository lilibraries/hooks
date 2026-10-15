import { useEffect, useMemo } from "react";

import useUnmount from "./useUnmount";
import getUrlExtname from "./utils/getUrlExtname";
import inBrowser from "./utils/inBrowser";

interface UseFaviconOptions {
  mime?: string;
  restore?: boolean;
}

const mimes = {
  gif: "image/gif",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  png: "image/png",
  svg: "image/svg+xml",
  webp: "image/webp",
  ico: "image/x-icon",
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

/**
 * Set the document favicon (website icon).
 *
 * @param href The favicon URL; pass `null` to not set one.
 * @param options The options object.
 * @param options.mime The MIME type of the favicon.
 * @param options.restore Whether to restore the previous favicon on unmount.
 */
function useFavicon(href: string | null, options?: UseFaviconOptions) {
  const { mime, restore } = options || {};

  const oldIconData = useMemo(() => {
    if (inBrowser) {
      const link = getLink();
      if (link) {
        return { type: link.type, rel: link.rel, href: link.href };
      }
    }
  }, []);

  useEffect(() => {
    if (!inBrowser || href == null) {
      return;
    }

    const link = getLink() || document.createElement("link");

    link.href = href;
    link.rel = "shortcut icon";
    link.type = mime || mimes[getUrlExtname(href) as keyof typeof mimes] || mimes.ico;

    if (!getLink()) {
      const head = getHead();
      head?.appendChild(link);
    }
  }, [href, mime]);

  useUnmount(() => {
    if (inBrowser && restore) {
      if (oldIconData === undefined) {
        const head = getHead();
        const link = getLink();
        if (link && head) {
          head.removeChild(link);
        }
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
