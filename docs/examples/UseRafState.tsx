import { useRef, useState } from "react";
import { useInterval, useRafState } from "@lilib/hooks";

function Example() {
  const [running, setRunning] = useState(false);
  const [traffic, setTraffic] = useRafState(0.5);
  const countersRef = useRef({ messages: 0, renders: 0 });

  countersRef.current.renders += 1;

  // A simulated socket pushing a traffic sample every 5 ms.
  const [start, cancel] = useInterval(() => {
    countersRef.current.messages += 1;
    setTraffic((previous) => previous + (Math.random() - previous) * 0.05);
  }, 5);

  function handleClick() {
    if (running) {
      cancel();
    } else {
      countersRef.current = { messages: 0, renders: 0 };
      start();
    }
    setRunning(!running);
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span>Live traffic</span>
        <button onClick={handleClick}>{running ? "Stop" : "Start"}</button>
      </div>
      <div style={{ marginTop: 8, fontSize: 28, fontWeight: 600, lineHeight: 1 }}>
        {(traffic * 100).toFixed(1)}
        <span style={{ marginLeft: 6, fontSize: 14, fontWeight: 400 }}>MB/s</span>
      </div>
      <div
        style={{
          height: 8,
          marginTop: 8,
          borderRadius: 4,
          background: "rgba(128, 128, 128, 0.25)",
        }}
      >
        <div
          style={{
            width: `${traffic * 100}%`,
            height: "100%",
            borderRadius: 4,
            background: "orange",
          }}
        />
      </div>
      <div style={{ marginTop: 8, fontSize: 12, opacity: 0.7 }}>
        {countersRef.current.messages} messages · {countersRef.current.renders} renders
      </div>
    </>
  );
}

export default Example;
