import { useState } from "react";
import useCreate from "./useCreate";
import useEventListener from "./useEventListener";

const query = "(prefers-color-scheme: dark)";

function useDarkTheme(): boolean {
  const media = useCreate(() => window.matchMedia(query));
  const [dark, setDark] = useState(media.matches);

  useEventListener(media, "change", (event: MediaQueryListEvent) => {
    setDark(event.matches);
  });

  return dark;
}

const env =
  typeof window !== "undefined" && typeof window.matchMedia !== "undefined";

export default env ? useDarkTheme : () => false;
