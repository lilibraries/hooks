import { execa } from "execa";

execa("git", ["restore", "package.json", "pnpm-lock.yaml"], {
  cwd: process.cwd(),
  preferLocal: false,
}).then(() => {
  console.log("Clean git.");
  process.exit(0);
});
