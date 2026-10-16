import { useWindowFocus } from "@lilib/hooks";

function Example() {
  const focus = useWindowFocus();

  return <div>Window has focus: {focus.toString()}</div>;
}

export default Example;
