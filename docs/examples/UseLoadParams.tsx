import React, { useRef } from "react";
import { useLoad } from "@lilib/hooks";

const getCount = (count: number) => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(count);
    }, 1000);
  });
};

function Example() {
  const countRef = useRef(0);

  const { data, loading, load } = useLoad(getCount, [], {
    initialData: -1,
    defaultParams: [0],
  });

  return (
    <div>
      <button onClick={() => load(++countRef.current)}>Load</button>
      Count: {data} {loading ? "(Loading...)" : ""}
    </div>
  );
}

export default Example;
