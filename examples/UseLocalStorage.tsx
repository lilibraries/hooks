import React from "react";
import { useLocalStorage } from "@lilib/hooks";

function Example() {
  const [value, setLocalStorage] = useLocalStorage("key", {
    polling: true,
    defaultValue: "default value",
  });

  return (
    <>
      <div>
        <button onClick={() => setLocalStorage(Math.random().toString())}>
          Set random value
        </button>{" "}
        <button onClick={() => setLocalStorage(undefined)}>Remove</button>
      </div>
      <div>The value is: {value}</div>
    </>
  );
}

export default Example;
