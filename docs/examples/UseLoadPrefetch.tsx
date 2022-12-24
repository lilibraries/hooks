import React from "react";
import { useLoad } from "@lilib/hooks";

const getNumber = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random());
    }, 1000);
  });
};

function RequestInBackground() {
  useLoad(getNumber, [], {
    idle: true,
    cacheKey: "load-prefetch",
    cacheTime: Infinity,
  });
  return null;
}

function Example() {
  const { data, loading, load } = useLoad(getNumber, [], {
    imperative: true,
    cacheKey: "load-prefetch",
    staleTime: Infinity,
  });

  return (
    <>
      <RequestInBackground />
      <button onClick={() => load()}>Load</button>
      Number: {data} {loading ? "(Loading...)" : ""}
    </>
  );
}

export default Example;
