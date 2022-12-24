import { useDebugValue, useMemo, useState } from "react";
import { inBrowser } from "@lilib/utils";
import useUpdate from "./useUpdate";
import useEventListener from "./useEventListener";

function useMatchMedia(query: string, defaultValue?: boolean) {
  const media = useMemo(() => {
    return inBrowser ? window.matchMedia(query) : null;
  }, [query]);
  const [matches, setMathes] = useState(media ? media.matches : !!defaultValue);

  useUpdate(() => {
    setMathes(media ? media.matches : !!defaultValue);
  }, [media]);

  useEventListener(media, "change", (event: MediaQueryListEvent) => {
    setMathes(event.matches);
  });

  useDebugValue(query + " is " + matches);

  return matches;
}

export default useMatchMedia;
