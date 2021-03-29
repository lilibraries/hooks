import { extname } from "./utils";
import useCreate from "./useCreate";
import useUnmount from "./useUnmount";
import useMounted from "./useMounted";
import usePrevious from "./usePrevious";

const mimes = {
  ico: "image/x-icon",
  png: "image/png",
  gif: "image/gif",
};

function useFavicon(href: string, options?: { restore?: boolean }) {
  const restore = options ? !!options.restore : false;
  const head = useCreate(() => document.getElementsByTagName("head")[0]);

  const oldIconData = useCreate(() => {
    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    if (link) return { type: link.type, rel: link.rel, href: link.href };
  });

  const link =
    (document.querySelector("link[rel*='icon']") as HTMLLinkElement) ||
    document.createElement("link");

  const mountedRef = useMounted();
  const previousHrefRef = usePrevious(href);

  if (!mountedRef.current || previousHrefRef.current !== href) {
    link.href = href;
    link.rel = "shortcut icon";
    link.type = mimes[extname(href) as keyof typeof mimes] || mimes.ico;

    if (!document.querySelector("link[rel*='icon']")) {
      head.appendChild(link);
    }
  }

  useUnmount(() => {
    if (restore) {
      if (oldIconData === undefined) {
        head.removeChild(link);
      } else {
        link.type = oldIconData.type;
        link.rel = oldIconData.rel;
        link.href = oldIconData.href;
      }
    }
  });
}

const useNoop: typeof useFavicon = () => {};

export default typeof document !== "undefined" ? useFavicon : useNoop;
