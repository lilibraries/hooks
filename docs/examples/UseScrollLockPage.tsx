import { useState } from "react";
import { useScrollLock } from "@lilib/hooks";

function Example() {
  const [open, setOpen] = useState(false);
  useScrollLock({ enabled: open });

  return (
    <>
      <button onClick={() => setOpen(true)}>Open modal</button>
      {open ? (
        <div
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setOpen(false);
            }
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            background: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            style={{
              width: "min(420px, 100%)",
              padding: 24,
              borderRadius: 8,
              color: "#1b1b1d",
              backgroundColor: "#ffffff",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Modal title</h3>
            <p>The page behind this modal cannot be scrolled.</p>
            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Example;
