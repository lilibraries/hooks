import React, { useRef, useState } from "react";
import { useClickAway } from "@lilib/hooks";

function Example() {
  const buttonRef = useRef(null);
  const [count, setCount] = useState(0);

  useClickAway(buttonRef, () => {
    setCount(count + 1);
  });

  return (
    <>
      <button ref={buttonRef}>Click outside</button> Count: {count}
    </>
  );
}

export default Example;
