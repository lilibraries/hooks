import React from "react";
import { useLoad, useToggle } from "@lilib/hooks";

const getNumber = () => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(Math.random());
    }, 1000);
  });
};

function Component() {
  const { data, loading } = useLoad(getNumber, [], {
    cacheKey: "load-cache-key",
  });

  return (
    <div>
      Number: {String(data)} {loading ? "(Loading...)" : ""}
    </div>
  );
}

function Example() {
  const [visible, { toggle }] = useToggle(false);

  return (
    <div>
      <button onClick={() => toggle()}>{visible ? "Hide" : "Show"}</button>
      {visible && <Component />}
    </div>
  );
}

export default Example;
