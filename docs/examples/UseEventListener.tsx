import { useRef, useState } from "react";
import { useEventListener } from "@lilib/hooks";

function Example() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [count, setCount] = useState(0);

  useEventListener(buttonRef, "click", () => {
    setCount((count) => count + 1);
  });

  return (
    <>
      <button ref={buttonRef}>Click</button> Count: {count}
    </>
  );
}

export default Example;
