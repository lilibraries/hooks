import React from "react";
import { useMatchMedia } from "@lilib/hooks";

function Example() {
  const matches = useMatchMedia("(max-width: 1200px)");
  return <>(max-width: 1200px): {matches.toString()}</>;
}

export default Example;
