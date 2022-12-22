import React from "react";
import { useLoad } from "@lilib/hooks";

const getNumber = () => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(Math.random());
    }, 1000);
  });
};

function Example() {
  const { data, loading, load, force } = useLoad(getNumber, [], {
    imperative: true,
    staleTime: 5000,
  });

  return (
    <div>
      <button onClick={() => load()}>Load</button>
      <button onClick={() => force()}>Force</button>
      Number: {loading ? "Loading..." : String(data)}
    </div>
  );
}

export default Example;
