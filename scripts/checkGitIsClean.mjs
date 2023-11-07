import { execa } from "execa";

execa("git", ["status", "--porcelain"], {
  cwd: process.cwd(),
  preferLocal: false,
}).then(function ({ stdout }) {
  if (stdout) {
    console.error("Please ensure git is clean.");
    process.exit(1);
  } else {
    process.exit(0);
  }
});
