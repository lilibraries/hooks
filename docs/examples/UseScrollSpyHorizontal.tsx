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
