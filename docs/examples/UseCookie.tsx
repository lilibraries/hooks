import React from "react";
import { useCookie } from "@lilib/hooks";

function Example() {
  const [value, setCookie] = useCookie("name", {
    polling: true,
    defaultValue: "default value",
  });

  return (
    <>
      <div>
        <button onClick={() => setCookie(Math.random().toString())}>
          Set random cookie
        </button>{" "}
        <button onClick={() => setCookie(undefined)}>Remove</button>
      </div>
      <div>Cookie value: {value}</div>
    </>
  );
}

export default Example;
