import { usePointerPosition } from "@lilib/hooks";

function Example() {
  const position = usePointerPosition();

  return (
    <div>
      {position ? `x: ${Math.round(position.x)}, y: ${Math.round(position.y)}` : "Move the pointer"}
    </div>
  );
}

export default Example;
