import React from "react";
import { useCache } from "@lilib/hooks";

function Component() {
  const [cache, setCache] = useCache("cache-sync", {
    defaultValue: "",
    cacheSync: true,
  });

  return (
    <>
      <input
        value={cache}
        onChange={(event) => {
          setCache(event.target.value || undefined);
        }}
      />{" "}
      <span>Cached data: {cache}</span>
    </>
  );
}

function Example() {
  return (
    <>
      <Component />
      <br />
      <Component />
    </>
  );
}

export default Example;
