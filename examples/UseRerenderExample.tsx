import React from "react";
import { useRerender } from "@lilib/hooks";

let count = 0;

function Example() {
  const rerender = useRerender();

  function handleClick() {
    count++;
    rerender();
  }

  return (
    <>
      <button onClick={handleClick}>+1</button> {count}
    </>
  );
}

export default Example;
