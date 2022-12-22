import React from "react";
import { useLoad } from "@lilib/hooks";

const getNumber = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() >= 0.8) {
        resolve("resolved");
      } else {
        reject(new Error("rejected"));
      }
    }, 1000);
  });
};

const getNumberFallback = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() >= 0.8) {
        resolve("fallback resolved");
      } else {
        reject(new Error("fallback rejected"));
      }
    }, 1000);
  });
};

function Example() {
  const { data, error, loading, load } = useLoad(getNumber, [], {
    imperative: true,
    fallback: getNumberFallback,
    retry: true,
    fallbackRetry: true,
  });

  return (
    <div>
      <button onClick={() => load()}>Load</button>
      {loading ? "loading" : error ? error.message : data}
    </div>
  );
}

export default Example;
