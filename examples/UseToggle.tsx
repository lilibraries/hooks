import React from "react";
import { useToggle } from "@lilib/hooks";

function Example() {
  const [visible, { toggle, toggleOn, toggleOff }] = useToggle(true);

  return (
    <>
      <button onClick={() => toggle()}>Toggle</button>
      <button onClick={toggleOn}>Show</button>
      <button onClick={toggleOff}>Hide</button>
      <div style={{ display: visible ? "block" : "none" }}>
        Example text can be handled by the buttons above.
      </div>
    </>
  );
}

export default Example;
