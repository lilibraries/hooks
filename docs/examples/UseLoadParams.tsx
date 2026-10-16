import { useState } from "react";
import { useLoad } from "@lilib/hooks";

const fetchCount = (multiplier: number) => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(10 * multiplier);
    }, 1000);
  });
};

function Example() {
  const [multiplier, setMultiplier] = useState(1);

  // `initialData` is shown before any data arrives; `defaultParams` are used by the first load.
  const { data, loading, load } = useLoad(fetchCount, [], {
    initialData: -1,
    defaultParams: [1],
  });

  return (
    <div>
      <select value={multiplier} onChange={(event) => setMultiplier(Number(event.target.value))}>
        <option value={1}>×1</option>
        <option value={2}>×2</option>
        <option value={3}>×3</option>
      </select>
      <button onClick={() => load(multiplier)}>Load</button>
      Count: {data} {loading ? "(Loading...)" : ""}
    </div>
  );
}

export default Example;
