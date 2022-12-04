import { useDebugValue } from "react";
import useMatchMedia from "./useMatchMedia";

function useDarkMode(): boolean {
  const isDarkMode = useMatchMedia("(prefers-color-scheme: dark)");
  useDebugValue(isDarkMode);
  return isDarkMode;
}

export default useDarkMode;
