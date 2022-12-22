import React from "react";
import { useLoad } from "@lilib/hooks";

const getData = () => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() >= 0.5) {
        resolve("@lilib/hooks");
      } else {
        reject(new Error("rejected"));
      }
    }, 1000);
  });
};

function Example() {
  const { data, error, loading } = useLoad(getData);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  return <div>Data: {data}</div>;
}

export default Example;
