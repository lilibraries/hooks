import inBrowser from "./inBrowser";

function isPageVisible() {
  return inBrowser ? document.visibilityState === "visible" : true;
}

export default isPageVisible;
