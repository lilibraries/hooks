import React from "react";
import { useDarkMode } from "@lilib/hooks";

function Example() {
  const isDarkMode = useDarkMode();
  return <>Is dark mode: {isDarkMode.toString()}</>;
}

export default Example;
