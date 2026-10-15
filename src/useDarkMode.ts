import { useDebugValue } from "react";

import useMatchMedia from "./useMatchMedia";

/**
 * Detect whether the system prefers dark mode.
 *
 * @returns Returns `true` if the system prefers dark mode, otherwise `false`.
 */
function useDarkMode(): boolean {
  const isDarkMode = useMatchMedia("(prefers-color-scheme: dark)");
  useDebugValue(isDarkMode);
  return isDarkMode;
}

export default useDarkMode;
