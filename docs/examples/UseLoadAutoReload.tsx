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
  const { data, loading } = useLoad(getCount, [], {
    autoReloadOnPageShow: true,
    autoReloadOnWindowFocus: true,
    autoReloadOnNetworkReconnect: true,
  });

  return (
    <div>
      Count: {data} {loading ? "(Loading...)" : ""}
    </div>
  );
}

export default Example;
