import { useRef, useState } from "react";
import { useScrollLock } from "@lilib/hooks";

const rows = Array.from({ length: 8 }, (_, index) => `Row ${index + 1}`);

function Example() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  useScrollLock({ target: containerRef, enabled: open });

  return (
    <div style={{ position: "relative", height: 220, overflow: "hidden", borderRadius: 8 }}>
      <div
        ref={containerRef}
        style={{
          height: "100%",
          boxSizing: "border-box",
          overflow: "auto",
          border: "1px solid rgba(128, 128, 128, 0.25)",
          borderRadius: 8,
        }}
      >
        <div style={{ padding: 12, borderBottom: "1px solid rgba(128, 128, 128, 0.25)" }}>
          <button onClick={() => setOpen(true)}>Open drawer</button>
        </div>
        {rows.map((row) => (
          <div
            key={row}
            style={{
              padding: "10px 16px",
              borderBottom: "1px solid rgba(128, 128, 128, 0.15)",
            }}
          >
            {row}
          </div>
        ))}
      </div>

      {open ? (
        <>
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              background: "rgba(0, 0, 0, 0.35)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: 2,
              width: "min(220px, 100%)",
              boxSizing: "border-box",
              padding: 16,
              color: "#1b1b1d",
              backgroundColor: "#ffffff",
              boxShadow: "-4px 0 12px rgba(0, 0, 0, 0.15)",
            }}
          >
            <h4 style={{ marginTop: 0 }}>Drawer</h4>
            <p>The container behind this drawer cannot be scrolled.</p>
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Example;
