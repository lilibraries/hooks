import { useKeyPressed } from "@lilib/hooks";

function Example() {
  const shiftPressed = useKeyPressed("shift");

  return (
    <div
      style={{
        padding: 8,
        borderRadius: 4,
        transition: "all 150ms",
        transform: shiftPressed ? "scale(1.1)" : "none",
        backgroundColor: shiftPressed ? "#d4edda" : "#f8f9fa",
      }}
    >
      {shiftPressed ? "Shift is held down" : "Hold Shift"}
    </div>
  );
}

export default Example;
