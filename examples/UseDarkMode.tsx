import { useDarkMode } from "@lilib/hooks";

function Example() {
  const isDarkMode = useDarkMode();
  return `Is dark mode: ${isDarkMode}`;
}

export default Example;
