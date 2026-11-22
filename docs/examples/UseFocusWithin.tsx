import type { CSSProperties } from "react";
import { useRef, useState } from "react";
import { useFocusWithin, useMount } from "@lilib/hooks";

const inputStyle: CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "6px 8px",
  fontSize: 13,
  color: "inherit",
  backgroundColor: "transparent",
  border: "1px solid rgba(128, 128, 128, 0.35)",
  borderRadius: 6,
};

function Example() {
  const groupRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const [isFocusWithin, setFocusWithin] = useState(false);

  useFocusWithin(groupRef, setFocusWithin);

  // Focus the first field on mount without scrolling the page to the example.
  useMount(() => {
    firstInputRef.current?.focus({ preventScroll: true });
  });

  return (
    <div>
      <div
        ref={groupRef}
        style={{
          display: "grid",
          gap: 8,
          maxWidth: 260,
          padding: 12,
          borderRadius: 10,
          border: `1px solid ${isFocusWithin ? "#25c2a0" : "rgba(128, 128, 128, 0.35)"}`,
          backgroundColor: isFocusWithin ? "rgba(37, 194, 160, 0.08)" : "transparent",
          transition: "border-color 120ms ease, background-color 120ms ease",
        }}
      >
        <input ref={firstInputRef} placeholder="First name" style={inputStyle} />
        <input placeholder="Last name" style={inputStyle} />
      </div>
      <div style={{ marginTop: 8, fontSize: 12, opacity: 0.7 }}>
        {isFocusWithin ? "Focus is within the group" : "Focus is outside the group"}
      </div>
    </div>
  );
}

export default Example;
