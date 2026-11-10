import { useState } from "react";
import { useHotkey } from "@lilib/hooks";

function Example() {
  const [count, setCount] = useState(0);

  useHotkey(
    "mod+a",
    () => {
      setCount((value) => value + 1);
    },
    { preventDefault: true },
  );

  return (
    <>
      Press <kbd>Ctrl</kbd> + <kbd>A</kbd> (or <kbd>⌘</kbd> + <kbd>A</kbd>) to count: {count}
    </>
  );
}

export default Example;
