# useScrollSpy

Track which item of a list is currently being read, vertically such as a table of contents, or horizontally such as a carousel. The active item is the last one whose section has scrolled past the start of the container. Before any section reaches the start, the first item is active; once the container reaches its end, the last item is.

## API

```ts
function useScrollSpy(
  keys: readonly string[],
  options?: {
    target?: Element | React.RefObject<Element | null> | null;
    axis?: "x" | "y";
    offset?: number;
    getElement?: (key: string, index: number) => Element | null;
  },
): readonly [
  string | undefined,
  {
    select: (key: string) => void;
    release: () => void;
  },
];
```

Parameters:

- **`keys`:** The keys of the items to track, in the order they are read.
- **`options`:** Options object.
  - **`options.target`:** The element that scrolls, or its ref. Defaults to the page; pass `null` to track nothing.
  - **`options.axis`:** `"y"` to follow vertical scrolling, `"x"` to follow horizontal scrolling. Defaults to `"y"`.
  - **`options.offset`:** How many pixels a section must scroll past the start of the container before it becomes active, for example the height of a sticky header. Defaults to `0`.
  - **`options.getElement`:** Returns the element for a key. Defaults to looking the key up as an id in the container's document.

Results:

- **`activeKey`:** The key of the active item, or `undefined` before the first measurement, including outside the browser.
- **`actions`:** An object that keeps the same identity between renders.
  - **`actions.select`:** Makes `key` the active item and keeps it active until the user scrolls or `release` is called, so a smooth scroll to that section does not move the highlight. It does not scroll by itself.
  - **`actions.release`:** Stops holding the selected key, so scrolling decides the active item again. Needed only when the scrolling is done by code.

## Notes

- The start of the container is its top edge on the vertical axis, and its left edge on the horizontal axis, or its right edge in right-to-left layouts.
- Items whose section is missing or hidden, for example with `display: none`, are skipped.
- Scrolling is measured at most once per frame, and the component re-renders only when the active item changes.

## Examples

### Vertical

The panel is a scroll container: clicking a link scrolls the panel and keeps that item active until the panel is scrolled again.

```tsx
import { useRef } from "react";

import { useScrollSpy } from "@lilib/hooks";

const sections = ["Overview", "Usage", "Options"];

function Example() {
  const panelRef = useRef<HTMLDivElement>(null);
  const [activeKey, { select }] = useScrollSpy(sections, { target: panelRef, offset: 12 });

  const goTo = (section: string) => {
    select(section);
    const panel = panelRef.current;
    const target = document.getElementById(section);
    if (panel && target) {
      const offset = target.getBoundingClientRect().top - panel.getBoundingClientRect().top;
      panel.scrollTo({ top: offset + panel.scrollTop, behavior: "smooth" });
    }
  };

  return (
    <div style={{ display: "flex", gap: 24 }}>
      <nav style={{ display: "grid", gap: 2, alignContent: "start" }}>
        {sections.map((section) => (
          <a
            key={section}
            href={`#${section}`}
            onClick={(event) => {
              event.preventDefault();
              goTo(section);
            }}
            style={{
              padding: "6px 0 6px 12px",
              borderLeft: `2px solid ${section === activeKey ? "orange" : "transparent"}`,
              color: section === activeKey ? "inherit" : "gray",
              textDecoration: "none",
            }}
          >
            {section}
          </a>
        ))}
      </nav>
      <div
        ref={panelRef}
        style={{
          boxSizing: "border-box",
          flex: 1,
          height: 180,
          overflowY: "auto",
          padding: "0 16px",
          border: "1px solid rgba(128, 128, 128, 0.6)",
          borderRadius: 8,
        }}
      >
        {sections.map((section, index) => (
          <section
            key={section}
            id={section}
            style={{
              boxSizing: "border-box",
              height: index === sections.length - 1 ? 180 : 88,
              paddingTop: 12,
            }}
          >
            <h4 style={{ margin: 0 }}>{section}</h4>
            <p style={{ margin: "6px 0 0", color: "gray" }}>Section content</p>
          </section>
        ))}
      </div>
    </div>
  );
}

export default Example;
```

### Horizontal

The same hook with `axis: "x"`, following a horizontally scrolling strip.

```tsx
import { useRef } from "react";

import { useScrollSpy } from "@lilib/hooks";

const slides = ["One", "Two", "Three", "Four", "Five"];

function Example() {
  const stripRef = useRef<HTMLDivElement>(null);
  const [activeKey, { select }] = useScrollSpy(slides, { target: stripRef, axis: "x" });

  return (
    <>
      <div
        ref={stripRef}
        style={{
          display: "flex",
          gap: 12,
          paddingBottom: 8,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
        }}
      >
        {slides.map((slide) => (
          <a
            key={slide}
            id={slide}
            href={`#${slide}`}
            onClick={(event) => {
              event.preventDefault();
              select(slide);
              event.currentTarget.scrollIntoView({
                behavior: "smooth",
                inline: "start",
                block: "nearest",
              });
            }}
            style={{
              flex: "0 0 62%",
              height: 104,
              display: "grid",
              placeItems: "center",
              scrollSnapAlign: "start",
              border: `2px solid ${slide === activeKey ? "orange" : "rgba(128, 128, 128, 0.6)"}`,
              borderRadius: 8,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {slide}
          </a>
        ))}
      </div>
      <p style={{ margin: "8px 0 0", color: "gray" }}>Active: {activeKey}</p>
    </>
  );
}

export default Example;
```
