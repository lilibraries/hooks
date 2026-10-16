import { useRef } from "react";
import { useRerender } from "@lilib/hooks";

function Example() {
  // A mutable value that lives outside React state.
  const countRef = useRef(0);
  const rerender = useRerender();

  function handleClick() {
    countRef.current++;
    rerender();
  }

  return (
    <>
      <button onClick={handleClick}>+1</button> {countRef.current}
    </>
  );
}

export default Example;
