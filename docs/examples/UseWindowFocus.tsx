import { useWindowFocus } from "@lilib/hooks";

function Example() {
  const focus = useWindowFocus();

  return (
    <div style={{ padding: 8, backgroundColor: focus ? "#d4edda" : "#fff3cd" }}>
      {focus ? "The window has focus" : "The window lost focus"}
    </div>
  );
}

export default Example;
