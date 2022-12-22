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
  const { data, loading, load } = useLoad(getNumber, [], { imperative: true });

  return (
    <div>
      <button onClick={() => load()}>Load</button>
      Number: {loading ? "Loading..." : String(data)}
    </div>
  );
}

export default Example;
