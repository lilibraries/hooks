import { useState } from "react";
import { useTimeout } from "@lilib/hooks";

function Example() {
  const [show, setShow] = useState(false);
  const [start, cancel] = useTimeout(() => {
    setShow(false);
  }, 1500);

  function handleShow() {
    setShow(true);
    start();
  }

  function handleCancel() {
    cancel();
    setShow(false);
  }

  return (
    <>
      <div>
        <button onClick={handleShow}>Show toast</button> <button onClick={handleCancel}>Cancel</button>
      </div>
      {show && (
        <div style={{ padding: 8, marginTop: 8, backgroundColor: "rgba(255, 165, 0, 0.3)" }}>A toast message</div>
      )}
    </>
  );
}

export default Example;
