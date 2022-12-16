import React, { useState } from "react";
import { useCache } from "@lilib/hooks";

function Example() {
  const [data, setData] = useState("");
  const [cache, setCache] = useCache("cache-time", {
    defaultValue: "",
    cacheSync: true,
    cacheTime: 3000,
    onSet: (data) => setData(data),
    onDelete: () => setData("deleted"),
  });

  return (
    <>
      <input
        value={cache}
        onChange={(event) => {
          setCache(event.target.value);
        }}
      />{" "}
      Data: {data}
    </>
  );
}

export default Example;
