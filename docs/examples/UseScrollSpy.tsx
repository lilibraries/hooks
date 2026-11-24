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
