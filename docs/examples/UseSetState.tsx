import React from "react";
import { useSetState } from "@lilib/hooks";

function Example() {
  const [state, setState] = useSetState({ count1: 0, count2: 0 });
  const { count1, count2 } = state;

  return (
    <>
      <div>
        <button
          onClick={() => {
            setState({ count1: count1 + 1 });
          }}
        >
          +1
        </button>{" "}
        {count1}
      </div>
      <div>
        <button
          onClick={() => {
            setState({ count2: count2 + 2 });
          }}
        >
          +2
        </button>{" "}
        {count2}
      </div>
    </>
  );
}

export default Example;
