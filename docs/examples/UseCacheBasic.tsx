import React, { useState } from "react";
import { useCache } from "@lilib/hooks";

function Example() {
  const [cache, setCache] = useCache("cache-basic", { defaultValue: "" });
  const [value, setValue] = useState(cache);

  return (
    <>
      <input
        value={value}
        onChange={(event) => {
          if (event.target.value) {
            setValue(event.target.value);
            setCache(event.target.value);
          } else {
            setValue("");
            setCache(undefined);
          }
        }}
      />{" "}
      <span>Initial cached data: {cache}</span>
    </>
  );
}

export default Example;
