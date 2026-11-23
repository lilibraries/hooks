import { useState } from "react";
import { useBeforeUnload } from "@lilib/hooks";

function Example() {
  const [draft, setDraft] = useState("");

  useBeforeUnload({ enabled: draft !== "" });

  return <input value={draft} onChange={(event) => setDraft(event.target.value)} />;
}

export default Example;
