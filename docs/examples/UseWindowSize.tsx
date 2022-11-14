import React from "react";
import { useWindowSize } from "@lilib/hooks";

function Example() {
  const { width = 0, height = 0 } = useWindowSize();

  return <>Window size: {JSON.stringify({ width, height })}</>;
}

export default Example;
