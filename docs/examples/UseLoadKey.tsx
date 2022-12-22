import React from "react";
import { useLoad, useReload } from "@lilib/hooks";

const getNumber = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random());
    }, 1000);
  });
};

function Component() {
  const { data, loading, reload } = useLoad(getNumber, [], { key: "load-key" });

  return (
    <div>
      Number: {loading ? "Loading..." : data}
      <button onClick={() => reload()}>Reload</button>
    </div>
  );
}

function Example() {
  const reload = useReload("load-key");

  return (
    <>
      <Component />
      <Component />
      <button onClick={() => reload()}>Reload</button>
    </>
  );
}

export default Example;
