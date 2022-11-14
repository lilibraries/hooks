import React, { useRef, useState } from "react";
import { useClickOutside } from "@lilib/hooks";

function Example() {
  const buttonRef = useRef(null);
  const [count, setCount] = useState(0);

  useClickOutside(buttonRef, () => {
    setCount(count + 1);
  });

  return (
    <>
      <button ref={buttonRef}>Click outside</button> Count: {count}
    </>
  );
}

export default Example;
