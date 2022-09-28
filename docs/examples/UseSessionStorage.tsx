import React from "react";
import { useSessionStorage } from "@lilib/hooks";

function Example() {
  const [value, setSessionStorage] = useSessionStorage("key", {
    polling: true,
    defaultValue: "default value",
  });

  return (
    <>
      <div>
        <button onClick={() => setSessionStorage(Math.random().toString())}>
          Set random value
        </button>{" "}
        <button onClick={() => setSessionStorage(undefined)}>Remove</button>
      </div>
      <div>The value is: {value}</div>
    </>
  );
}

export default Example;
