import React from "react";
import { useWindowSize } from "@lilib/hooks";

function Example() {
  const { width, height } = useWindowSize();
  return (
    <>
      Width: {width}px; Height: {height}px
    </>
  );
}

export default Example;
