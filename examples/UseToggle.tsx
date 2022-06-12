import React from "react";
import { useToggle } from "@lilib/hooks";

function Example() {
  const [value, { toggle, toggleOn, toggleOff }] = useToggle(true);

  return (
    <>
      <button onClick={() => toggle()}>Toggle</button>{" "}
      <button onClick={toggleOn}>Toggle on</button>{" "}
      <button onClick={toggleOff}>Toggle off</button> {`Value: ${value}`}
    </>
  );
}

export default Example;
