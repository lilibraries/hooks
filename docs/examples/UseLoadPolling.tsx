import React from "react";
import { useLoad } from "@lilib/hooks";

let count = 0;
const getCount = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(++count);
    }, 1000);
  });
};

function Example() {
  const { data, loading, load, cancel } = useLoad(getCount, [], {
    imperative: true,
    polling: true,
    pollingInterval: 3000,
  });

  return (
    <div>
      <button onClick={() => load()}>Start</button>
      <button onClick={() => cancel()}>Cancel</button>
      Count: {data} {loading ? "(Loading...)" : ""}
    </div>
  );
}

export default Example;
