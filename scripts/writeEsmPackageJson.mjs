import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptsDir, "..");

// The ESM build emits `.js` files with ESM syntax; this marker tells Node to parse them as modules.
// `sideEffects` mirrors the root declaration, which bundlers no longer see past this nested file.
fs.writeFileSync(
  path.resolve(projectRoot, "dist/esm/package.json"),
  `${JSON.stringify({ type: "module", sideEffects: false })}\n`,
);
