function extname(url: string): string {
  if (typeof url === "string" && url !== "") {
    const blocks = url.split(/[#?]/);

    if (blocks.length) {
      const pathname = blocks[0];
      const chunks = pathname.split(".");

      if (chunks.length > 1) {
        return chunks[chunks.length - 1].trim().toLowerCase();
      }
    }
  }

  return "";
}

export default extname;
