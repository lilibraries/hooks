import React from "react";
import { useLocalStorage } from "@lilib/hooks";

function Example() {
  const [value, { set, remove }] = useLocalStorage("key", "default value");

  return (
    <>
      <div>
        <button onClick={() => set("new value")}>Set</button>
        <button onClick={remove}>Remove</button>
      </div>
      <div>The value is: {value}</div>
    </>
  );
}

export default Example;
