import { useMatchMedia } from "@lilib/hooks";

function Example() {
  const isNarrow = useMatchMedia("(max-width: 600px)");

  return (
    <div style={{ display: "flex", flexDirection: isNarrow ? "column" : "row", gap: 8 }}>
      <div style={{ flex: 1, padding: 16, backgroundColor: "rgba(255, 165, 0, 0.4)" }}>Sidebar</div>
      <div style={{ flex: 2, padding: 16, backgroundColor: "rgba(0, 128, 255, 0.4)" }}>Content</div>
    </div>
  );
}

export default Example;
