import { useEffect, useState } from "react";
import { usePersist } from "@lilib/hooks";

function Example() {
  const [value, setValue] = useState("");
  const [lastSeen, setLastSeen] = useState("");

  // The callback identity never changes, so the listener is bound only once.
  const onClick = usePersist(() => {
    // Always reads the latest `value` (no stale closure).
    setLastSeen(value);
  });

  useEffect(() => {
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [onClick]);

  return (
    <>
      <p>
        Enter value:{" "}
        <input
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
      </p>
      <div>Last value read on click: {lastSeen || "—"}</div>
    </>
  );
}

export default Example;
