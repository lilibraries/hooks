import { useState } from "react";
import { useLoad } from "@lilib/hooks";

const fetchData = () => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() >= 0.5) {
        resolve("resolved");
      } else {
        reject(new Error("rejected"));
      }
    }, 1000);
  });
};

function Example() {
  const [logs, setLogs] = useState<string[]>([]);

  const { load } = useLoad(fetchData, [], {
    imperative: true,
    onSuccess: () => {
      setLogs((logs) => [...logs, "onSuccess"]);
    },
    onFailure: () => {
      setLogs((logs) => [...logs, "onFailure"]);
    },
    onFinally: () => {
      setLogs((logs) => [...logs, "onFinally"]);
    },
  });

  function handleClick() {
    setLogs([]);
    load()
      .then(() => {
        setLogs((logs) => [...logs, "then"]);
      })
      .catch(() => {
        setLogs((logs) => [...logs, "catch"]);
      });
  }

  return (
    <div>
      <button onClick={handleClick}>Load</button>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
}

export default Example;
