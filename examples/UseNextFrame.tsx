import React, { useState } from "react";
import { useNextFrame, useTimeout } from "@lilib/hooks";

function Example() {
  const [display, setDisplay] = useState(false);
  const [visible, setVisible] = useState(false);

  const [startShow] = useNextFrame(() => setVisible(true));
  const [startHide] = useTimeout(() => setDisplay(false), 1000);

  function show() {
    setDisplay(true);
    startShow();
  }

  function hide() {
    setVisible(false);
    startHide();
  }

  return (
    <>
      <div>
        <button onClick={show}>Show</button>
        <button onClick={hide}>Hide</button>
      </div>
      <div
        style={{
          display: display ? "block" : "none",
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease",
        }}
      >
        Example text.
      </div>
    </>
  );
}

export default Example;
