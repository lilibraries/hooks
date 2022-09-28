import React from "react";
import { useOnline } from "@lilib/hooks";

function Example() {
  const online = useOnline();
  return <>The network is: {online ? "online" : "offline"}</>;
}

export default Example;
