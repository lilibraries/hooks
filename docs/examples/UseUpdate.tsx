import { useState } from "react";
import { useUpdate } from "@lilib/hooks";

function Example() {
  const [value, setValue] = useState(0);
  const [runs, setRuns] = useState(0);

  useUpdate(() => {
    setRuns((runs) => runs + 1);
  }, [value]);

  return (
    <>
      <button onClick={() => setValue((value) => value + 1)}>Change value</button>
      <div>Value: {value}</div>
      <div>Effect ran: {runs} time(s)</div>
    </>
  );
}

export default Example;
