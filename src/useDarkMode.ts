import useMatchMedia from "./useMatchMedia";

function useDarkMode(): boolean {
  return useMatchMedia("(prefers-color-scheme: dark)");
}

export default useDarkMode;
