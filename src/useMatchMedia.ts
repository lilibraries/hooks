import { useDebugValue, useMemo, useState } from "react";

import useEventListener from "./useEventListener";
import useLatestRef from "./useLatestRef";
import useUpdate from "./useUpdate";
import inBrowser from "./utils/inBrowser";

/**
 * Use `window.matchMedia()` to determine whether the document matches a media query string.
 *
 * @param query The media query string.
 * @param defaultValue The default return value in non-browser environments.
 * @returns Returns a boolean indicating whether it matches.
 */
function useMatchMedia(query: string, defaultValue?: boolean) {
  const media = useMemo(() => {
    return inBrowser ? window.matchMedia(query) : null;
  }, [query]);
  const mediaRef = useLatestRef(media);
  const [matches, setMatches] = useState(media ? media.matches : !!defaultValue);

  // The media object is rebuilt when the query changes; sync the latest match result
  useUpdate(() => {
    setMatches(media ? media.matches : !!defaultValue);
  }, [media]);

  useEventListener(mediaRef, "change", (event: MediaQueryListEvent) => {
    setMatches(event.matches);
  });

  useDebugValue(query + " is " + matches);

  return matches;
}

export default useMatchMedia;
