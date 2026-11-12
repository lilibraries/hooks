# useScrollLock

Lock scrolling of a container while it is enabled, and restore the previous styles when the lock is released.

## API

```ts
function useScrollLock(options?: {
  target?: Element | React.RefObject<Element | null> | null;
  enabled?: boolean;
}): void;
```

Parameters:

- **`options`:** Options object.
  - **`options.target`:** The element (or its ref) whose scrolling is locked. Defaults to the page scroll container (`document.scrollingElement`, falling back to `document.documentElement`); pass `null` to lock nothing. A ref is read when the effect runs, so an element assigned after the first render is locked on the next one.
  - **`options.enabled`:** Whether the lock is active. Defaults to `true`.

## Notes

- Locks are reference counted per element, so overlapping modals and drawers keep it locked until the last one releases it.
- The disappeared scrollbar's width is compensated on the target, so the layout does not shift; nothing is added for overlay scrollbars or `scrollbar-gutter: stable`.
- Pass the element that actually scrolls the page as `target` when it is not the viewport, for example `#root { overflow: auto }`.
- An `overflow` rule marked `!important` on the target overrides the lock.
- On iOS Safari the page may still bounce while locked; this is the limit of the `overflow` approach.

## Examples

### Lock the page scroll

The following example locks the page while the modal is open. Click the backdrop or the close button to dismiss it.

```tsx
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
```

### Lock the scroll of an element

The following example locks the scroll of a container: open the drawer overlaying it, and the container no longer scrolls while the page around it does.

```tsx
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
```
