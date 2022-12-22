import React from "react";
import { useLoad } from "@lilib/hooks";

const getNumberError = () => {
  return new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("rejected"));
    }, 1000);
  });
};

const getNumberFallback = () => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(Math.random());
    }, 1000);
  });
};

function Example() {
  const { data, error, loading } = useLoad(getNumberError, [], {
    fallback: getNumberFallback,
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  return <div>Number: {data}</div>;
}

export default Example;
