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
  const { data, loading } = useLoad(getNumber, [], {
    key: "reload-key",
  });

  return <div>Number: {loading ? "Loading..." : data}</div>;
}

function Example() {
  const reload = useReload("reload-key");

  return (
    <>
      <Component />
      <button onClick={() => reload()}>Reload</button>
    </>
  );
}

export default Example;
