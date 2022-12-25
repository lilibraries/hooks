import React from "react";
import { useDelayedValue, useToggle } from "@lilib/hooks";

function Example() {
  const [loading, { toggle }] = useToggle(false);
  const delayedLoading = useDelayedValue(loading, {
    delay: 500,
    include: (value) => value === true,
  });

  return (
    <div>
      <button onClick={() => toggle()}>Toggle</button>
      {delayedLoading && "Loading..."}
    </div>
  );
}

export default Example;
