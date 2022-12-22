import React from "react";
import { useLoad } from "@lilib/hooks";

const getData = () => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() >= 0.5) {
        resolve("resolved");
      } else {
        reject(new Error("rejected"));
      }
    }, 1000);
  });
};

function Example() {
  const { load } = useLoad(getData, [], {
    imperative: true,
    onSuccess: () => {
      console.log("onSuccess");
    },
    onFailure: () => {
      console.log("onFailure");
    },
    onFinally: () => {
      console.log("onFinally");
    },
  });

  function handleClick() {
    load()
      .then(() => {
        console.log("success");
      })
      .catch(() => {
        console.log("failed");
      });
  }

  return <button onClick={handleClick}>Load</button>;
}

export default Example;
