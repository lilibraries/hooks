import React from "react";
import { renderHook as _renderHook } from "@testing-library/react-hooks";

let renderHook: typeof _renderHook;

if (parseInt(React.version) >= 18) {
  renderHook = require("@testing-library/react").renderHook;
} else {
  renderHook = require("@testing-library/react-hooks").renderHook;
}

export default renderHook;
