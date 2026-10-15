import React from "react";
import { renderHook as _renderHook } from "@testing-library/react-hooks";

let renderHook: typeof _renderHook;

/* eslint-disable @typescript-eslint/no-require-imports -- runtime selection by React version, static imports would load both test libraries in every matrix */
if (parseInt(React.version) >= 18) {
  renderHook = require("@testing-library/react").renderHook;
} else {
  renderHook = require("@testing-library/react-hooks").renderHook;
}
/* eslint-enable @typescript-eslint/no-require-imports */

export default renderHook;
