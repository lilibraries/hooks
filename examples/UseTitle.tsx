import React, { useState } from "react";
import { useTitle } from "@lilib/hooks";

function Example() {
  const [title, setTitle] = useState("");
  useTitle(title, { restore: true });

  return (
    <input
      placeholder="Enter title"
      value={title}
      onChange={(event) => {
        setTitle(event.target.value);
      }}
    />
  );
}

export default Example;
