import { useDebugValue } from "react";

import usePersist from "./usePersist";
import useSafeState from "./useSafeState";
import useTimeout from "./useTimeout";
import useUnmountedRef from "./useUnmountedRef";
import inBrowser from "./utils/inBrowser";
import isPositiveNumber from "./utils/isPositiveNumber";
import warn from "./utils/warn";

// Fallback for environments without the async Clipboard API (or in non-secure
// contexts): copy through a temporary, invisible textarea + execCommand.
function copyTextLegacy(text: string) {
  const textarea = document.createElement("textarea");

  try {
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";

    document.body.appendChild(textarea);
    textarea.select();
    // iOS Safari only selects the full value through setSelectionRange
    textarea.setSelectionRange(0, textarea.value.length);

    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    // `remove()` is a no-op for a never-appended node
    textarea.remove();
  }
}

/**
 * Copy text to the clipboard and track whether a copy just succeeded.
 *
 * @param resetTimeout The time (milliseconds) `copied` stays `true` after a successful
 *   copy, defaults to `1000`.
 * @returns Returns a `[copied, copy]` tuple: `copied` indicates a successful copy within
 *   the last `resetTimeout` milliseconds; `copy` keeps a stable identity and resolves
 *   with whether `text` was written to the clipboard.
 */
function useCopyToClipboard(resetTimeout: number = 1000) {
  warn(
    isPositiveNumber(resetTimeout),
    "[useCopyToClipboard] The `resetTimeout` parameter must be a positive number, but received `%s`.",
    resetTimeout,
  );
  const delay = isPositiveNumber(resetTimeout) ? resetTimeout : 1000;

  const unmountedRef = useUnmountedRef();
  const [copied, setCopied] = useSafeState(false);
  const [startReset, cancelReset] = useTimeout(() => setCopied(false), delay);

  const copy = usePersist(async (text: string) => {
    if (!inBrowser) {
      return false;
    }

    const clipboard = navigator.clipboard;

    if (clipboard && typeof clipboard.writeText === "function") {
      try {
        await clipboard.writeText(text);
      } catch {
        return false;
      }
    } else if (!copyTextLegacy(text)) {
      return false;
    }

    // Only a successful copy restarts the reset timer; a failed attempt must not
    // interrupt the feedback of a previous success.
    if (!unmountedRef.current) {
      cancelReset();
      setCopied(true);
      startReset();
    }

    return true;
  });

  useDebugValue(copied);

  return [copied, copy] as const;
}

export default useCopyToClipboard;
