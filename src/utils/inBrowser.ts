// Whether the code is running in a browser environment (false during SSR)
const inBrowser = !!(typeof window !== "undefined" && window.document && window.document.createElement);

export default inBrowser;
