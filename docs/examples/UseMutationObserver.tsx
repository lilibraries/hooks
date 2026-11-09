import { useRef, useState } from "react";
import { useMutationObserver } from "@lilib/hooks";

function Example() {
  const [content, setContent] = useState("Hello");
  const [lastMutation, setLastMutation] = useState("None");
  const containerRef = useRef<HTMLDivElement>(null);

  useMutationObserver(
    containerRef,
    (records) => {
      const record = records[0];
      setLastMutation(record ? record.type : "None");
    },
    { childList: true, characterData: true, subtree: true },
  );

  return (
    <>
      <div>
        <button onClick={() => setContent((content) => (content === "Hello" ? "World" : "Hello"))}>
          Change text
        </button>
      </div>
      <div
        ref={containerRef}
        style={{
          padding: 16,
          backgroundColor: "rgba(255, 165, 0, 0.3)",
        }}
      >
        {content}
      </div>
      <div>Last mutation: {lastMutation}</div>
    </>
  );
}

export default Example;
