import { execa } from "execa";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptsDir, "..");
const depsRoot = path.resolve(projectRoot, ".test-deps");

const matrix = {
  react16: [
    "react@16",
    "react-dom@16",
    "scheduler@^0.19.1",
    "@testing-library/dom@8",
    "@testing-library/react@12",
    "@testing-library/react-hooks@7",
  ],
  react17: [
    "react@17",
    "react-dom@17",
    "scheduler@^0.20.2",
    "@testing-library/dom@8",
    "@testing-library/react@12",
    "@testing-library/react-hooks@7",
  ],
  react18: [
    "react@18",
    "react-dom@18",
    "scheduler@^0.23.2",
    "@testing-library/dom@10",
    "@testing-library/react@16",
  ],
  react19: [
    "react@19",
    "react-dom@19",
    "scheduler@^0.28.0",
    "@testing-library/dom@10",
    "@testing-library/react@16",
  ],
};

const target = process.argv.slice(2).find((arg) => !arg.startsWith("--"));
if (target !== undefined && !matrix[target]) {
  console.error(`Unknown target "${target}", expected one of: ${Object.keys(matrix).join(", ")}.`);
  process.exit(1);
}

function toDependencies(packages) {
  const dependencies = {};
  for (const spec of packages) {
    const at = spec.lastIndexOf("@");
    dependencies[spec.slice(0, at)] = spec.slice(at + 1);
  }
  return dependencies;
}

async function main() {
  await fsp.mkdir(depsRoot, { recursive: true });

  const rootNpmrc = path.join(projectRoot, ".npmrc");
  if (fs.existsSync(rootNpmrc)) {
    try {
      await fsp.copyFile(rootNpmrc, path.join(depsRoot, ".npmrc"));
    } catch {
      // Copying .npmrc is best-effort; install works without it.
    }
  }

  const entries = target ? [[target, matrix[target]]] : Object.entries(matrix);
  for (const [name, packages] of entries) {
    const dir = path.join(depsRoot, name);
    console.log(`Preparing ${name} at ${dir}`);
    await fsp.rm(dir, { recursive: true, force: true });
    await fsp.mkdir(dir, { recursive: true });
    await fsp.writeFile(
      path.join(dir, "package.json"),
      `${JSON.stringify(
        {
          name: `hooks-test-deps-${name}`,
          private: true,
          dependencies: toDependencies(packages),
        },
        null,
        2,
      )}\n`,
    );
    // Install each React version independently to prevent pnpm from walking up to the workspace and only installing the root project.
    await execa("pnpm", ["--dir", dir, "install", "--ignore-workspace", "--prefer-offline"], {
      stdio: "inherit",
    });
  }

  console.log(target ? "Done." : "Done. Run `npm test` to test all React versions.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
