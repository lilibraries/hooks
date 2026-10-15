import inBrowser from "./inBrowser";

function getUrlExtname(url: string): string {
  try {
    // Resolve relative paths against the current page
    const { protocol, pathname } = new URL(url, inBrowser ? window.location.href : undefined);

    if (protocol === "data:" || protocol === "blob:") {
      return "";
    }

    // Only consider an extension when the last path segment (the filename)
    // contains a dot, so dotted intermediate directories such as `/v1.0/avatar`
    // are not mistaken for filenames.
    const basename = pathname.split("/").pop() as string;
    if (basename.includes(".")) {
      return (basename.split(".").pop() as string).toLowerCase();
    }
  } catch {
    // Silently ignore unparseable URLs
  }

  return "";
}

export default getUrlExtname;
