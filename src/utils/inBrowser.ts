const inBrowser = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

export default inBrowser;
