import React from "react";
import { useWindowFocus } from "@lilib/hooks";

function Example() {
  const focus = useWindowFocus();

  return <div>Is window focus: {focus.toString()}</div>;
}

export default Example;
