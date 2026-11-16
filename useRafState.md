# useRafState

This hook works like `React.useState`, except that the updates made within one animation frame are merged and committed once in the next frame. Use it for sources that fire more often than a frame — streamed messages, raw pointer events, timers — where only the latest value in a frame matters. Sources the browser already aligns to frames, such as `pointermove`, rarely gain from it.

## API

```ts
function useRafState<S>(
  initialState: S | (() => S),
): [state: S, setState: React.Dispatch<React.SetStateAction<S>>];

function useRafState<S = undefined>(): [
  state: S | undefined,
  setState: React.Dispatch<React.SetStateAction<S | undefined>>,
];
```

Parameters:

- **`initialState`:** The initial state, same as `React.useState`.

Results:

- **`state`:** The committed state.
- **`setState`:** Update the state, same as the setter of `React.useState`.

## Notes

- Updates in a frame are applied in call order: updater functions accumulate, while a plain value overwrites earlier ones.
- Unlike `useState`, `state` still holds the previous value right after `setState`; the new value appears in the next frame.
- Animation frames are paused while the document is hidden, so pending updates are committed once it becomes visible again.

## Example

Press Start: a simulated socket pushes a traffic sample every 5 ms, so the message count climbs several times faster than the render count.

```tsx
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
```
