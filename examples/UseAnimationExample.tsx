import React, { useState } from "react";
import { Easing } from "@tweenjs/tween.js";
import { useAnimation } from "@lilib/hooks";

const options: string[] = [];
const algorithms: { [name: string]: (percent: number) => number } = {};

for (let type in Easing) {
  for (let mode in (Easing as any)[type]) {
    let name = type + mode;
    if (name === "LinearNone") {
      name = "Linear";
    }
    options.push(name);
    algorithms[name] = (Easing as any)[type][mode];
  }
}

function Example() {
  const [algorithmName, setAlgorithmName] = useState(options[0]);
  const [percent, setPercent] = useState(0);
  const [start, cancel] = useAnimation((percent) => setPercent(percent), {
    duration: 1000,
    algorithm: algorithms[algorithmName],
  });

  return (
    <>
      <div>
        <button onClick={start}>Start</button>
        <button onClick={cancel}>Cancel</button>
        <select
          value={algorithmName}
          onChange={(event) => {
            setAlgorithmName(event.target.value);
          }}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{
          height: 8,
          width: percent * 100 + "%",
          marginTop: 8,
          backgroundColor: "orange",
        }}
      ></div>
    </>
  );
}

export default Example;
