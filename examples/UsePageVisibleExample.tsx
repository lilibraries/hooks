import React, { useState } from "react";
import { usePageVisible, useUpdate } from "@lilib/hooks";

function Example() {
  const isPageVisible = usePageVisible();
  const [logs, setLogs] = useState([`Is page visible: ${isPageVisible}`]);

  useUpdate(() => {
    setLogs((logs) => {
      return [...logs, `Is page visible: ${isPageVisible}`];
    });
  }, [isPageVisible]);

  return (
    <ul>
      {logs.map((log, index) => {
        return <li key={index}>{log}</li>;
      })}
    </ul>
  );
}

export default Example;
