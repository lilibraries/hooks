import React from "react";
import { act as _act } from "react-dom/test-utils";

let act: typeof _act;

if (parseInt(React.version) >= 19) {
  act = require("react").act;
} else {
  act = require("react-dom/test-utils").act;
}

export default act;
