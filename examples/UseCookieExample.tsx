import React from "react";
import { useCookie } from "@lilib/hooks";

function Example() {
  const [value, { set, remove }] = useCookie("name", "default value");

  return (
    <>
      <div>
        <button onClick={() => set("new value")}>Set</button>
        <button onClick={remove}>Remove</button>
      </div>
      <div>Cookie value: {value}</div>
    </>
  );
}

export default Example;
