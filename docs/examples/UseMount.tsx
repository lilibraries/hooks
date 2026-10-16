import { useRef } from "react";
import { useMount } from "@lilib/hooks";

function Example() {
  const inputRef = useRef<HTMLInputElement>(null);

  useMount(() => {
    inputRef.current?.focus();
  });

  return <input ref={inputRef} placeholder="Focused on mount" />;
}

export default Example;
