import React, { useState } from "react";
import { useLoad } from "@lilib/hooks";

let count = 0;
const getCount = () => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(++count);
    }, 1000);
  });
};

function Example() {
  const [list, setList] = useState<number[]>([]);

  const { loading, load } = useLoad(getCount, [], {
    imperative: true,
    onSuccess: (count) => {
      setList((list) => [...list, count]);
    },
  });

  return (
    <div>
      <button onClick={() => load()}>Load</button>
      <ul>
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
        {loading && <li key="loading">Loading...</li>}
      </ul>
    </div>
  );
}

export default Example;
