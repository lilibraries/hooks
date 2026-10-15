import inBrowser from "./inBrowser";

// Whether the page is visible; always treated as visible outside the browser
function isPageVisible() {
  return inBrowser ? document.visibilityState === "visible" : true;
}

export default isPageVisible;
