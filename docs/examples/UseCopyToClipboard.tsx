import { useState } from "react";
import { useCopyToClipboard } from "@lilib/hooks";

function Example() {
  const [text, setText] = useState("Hello, @lilib/hooks!");
  const [copied, copy] = useCopyToClipboard();

  return (
    <div>
      <input value={text} onChange={(event) => setText(event.target.value)} />{" "}
      <button onClick={() => copy(text)}>{copied ? "Copied!" : "Copy"}</button>
    </div>
  );
}

export default Example;
