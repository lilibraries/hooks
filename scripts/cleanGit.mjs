import { execa } from "execa";

execa("git", ["clean"], {
  cwd: process.cwd(),
  preferLocal: false,
});
