import React, { useRef } from "react";
import { useEventListener } from "@lilib/hooks";

function Example() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEventListener(buttonRef, "click", () => {
    alert("Click");
  });

  return <button ref={buttonRef}>Click</button>;
}

export default Example;
