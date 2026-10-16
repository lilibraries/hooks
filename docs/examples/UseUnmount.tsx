import { useState } from "react";
import { useUnmount } from "@lilib/hooks";

function Child({ onUnmount }: { onUnmount: (time: string) => void }) {
  useUnmount(() => {
    onUnmount(new Date().toLocaleTimeString());
  });

  return <div>Child component</div>;
}

function Example() {
  const [show, setShow] = useState(true);
  const [unmountedAt, setUnmountedAt] = useState("");
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <button onClick={() => setShow((show) => !show)}>{show ? "Unmount" : "Mount"} child</button>
      </div>
      {show && (
        <Child
          onUnmount={(time) => {
            setUnmountedAt(time);
            setCount((count) => count + 1);
          }}
        />
      )}
      <div>Unmounted times: {count}</div>
      <div>Last unmounted at: {unmountedAt || "Never"}</div>
    </>
  );
}

export default Example;
