import { useState } from "react";
import { useIdle } from "@lilib/hooks";

function Example() {
  const [logs, setLogs] = useState<string[]>([]);
  const [start, cancel] = useIdle(() => {
    setLogs((logs) => [...logs, `Idle task done at ${new Date().toLocaleTimeString()}`]);
  });

  return (
    <>
      <div>
        <button onClick={start}>Start idle task</button> <button onClick={cancel}>Cancel</button>
      </div>
      <ul style={{ margin: 0, paddingLeft: 24 }}>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </>
  );
}

export default Example;
