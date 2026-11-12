# useScroll

Track the scroll position, direction, and progress of the page or an element. This hook only reads scroll state; use native `Element.scrollTo`/`Element.scrollBy` or `window.scrollTo` to scroll.

## API

```ts
function useScroll(options?: { target?: Element | React.RefObject<Element | null> | null }): {
  x: number;
  y: number;
  directionX: "left" | "right" | undefined;
  directionY: "up" | "down" | undefined;
  progressX: number;
  progressY: number;
};
```

Parameters:

- **`options`:** Options object.
  - **`options.target`:** The element (or its ref) whose scrolling is tracked. Defaults to the page scroll container; pass `null` to track nothing. A ref is read when the effect runs, so an element assigned after the first render is tracked on the next one.

Results:

- **`x`:** Horizontal scroll offset. It keeps the native `scrollLeft` sign, so it is negative in right-to-left layouts.
- **`y`:** Vertical scroll offset.
- **`directionX`:** The last horizontal movement direction; `right` when `x` increases and `left` when it decreases.
- **`directionY`:** The last vertical movement direction; `down` when `y` increases and `up` when it decreases.
- **`progressX`:** Horizontal scroll progress from the inline start to the inline end, from `0` to `1`.
- **`progressY`:** Vertical scroll progress from the top to the bottom, from `0` to `1`.

## Notes

- `x` and `y` are clamped to their scrollable ranges, so rubber-band overscroll does not produce out-of-range values or direction jitter. `x` keeps the native sign, so it is negative in RTL.
- `directionX` and `directionY` change only on scroll events, including programmatic scrolling. They stay unchanged when scrolling stops; while the axis remains scrollable, resize, content reflow, and bfcache restoration do not flip them. They are `undefined` before the first movement, after the target changes, or when that axis is not scrollable.
- `progressX` accounts for right-to-left layouts; `progressY` does not need to. Both are `0` when their axis is not scrollable.
- Omit `target` to track the page; `target: null` disables tracking.
- Updates are coalesced with `requestAnimationFrame`, so there is at most one render per frame. The hook also refreshes on window or target resize and on `pageshow`; content that grows while the target is idle is reflected on the next scroll or resize.
- Returns zeros and `undefined` directions outside the browser.

## Examples

### Track the page

The following example shows the page reading progress and uses native `window.scrollTo` to return to the top.

```tsx
import { useScroll } from "@lilib/hooks";

function Example() {
  const { progressY, directionY } = useScroll();

  return (
    <>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          height: 8,
          backgroundColor: "rgba(128, 128, 128, 0.2)",
        }}
      >
        <div
          style={{
            width: `${progressY * 100}%`,
            height: "100%",
            backgroundColor: "orange",
          }}
        />
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to top</button>
        <span>
          Progress: {Math.round(progressY * 100)}%; direction: {directionY || "none"}
        </span>
      </div>
      <p>Scroll the page to see the progress bar and direction update.</p>
    </>
  );
}

export default Example;
```

### Track an element

The following example tracks a two-dimensional scroll container; its buttons use the element's native `scrollTo` and `scrollBy`.

```tsx
import { useRef } from "react";
import { useScroll } from "@lilib/hooks";

function Example() {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y, directionX, directionY, progressX, progressY } = useScroll({ target: ref });

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
        <button onClick={() => ref.current?.scrollTo({ left: 0, top: 0, behavior: "smooth" })}>
          Reset
        </button>
        <button onClick={() => ref.current?.scrollBy({ left: 120, behavior: "smooth" })}>
          Scroll right
        </button>
        <button onClick={() => ref.current?.scrollBy({ top: 120, behavior: "smooth" })}>
          Scroll down
        </button>
      </div>
      <div
        ref={ref}
        style={{
          width: 320,
          height: 180,
          overflow: "auto",
          border: "1px solid rgba(128, 128, 128, 0.3)",
        }}
      >
        <div
          style={{
            width: 900,
            height: 600,
            padding: 16,
            background: "linear-gradient(135deg, rgba(255, 165, 0, 0.08), rgba(0, 128, 255, 0.08))",
          }}
        >
          Scroll this box horizontally and vertically.
        </div>
      </div>
      <div style={{ marginTop: 8, fontSize: 14 }}>
        x: {Math.round(x)}, y: {Math.round(y)}, directionX: {directionX || "none"}, directionY:{" "}
        {directionY || "none"}, progressX: {Math.round(progressX * 100)}%, progressY:{" "}
        {Math.round(progressY * 100)}%
      </div>
    </>
  );
}

export default Example;
```
