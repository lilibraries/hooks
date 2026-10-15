import { readdirSync } from "node:fs";
import { basename, extname, resolve } from "node:path";

import * as hooks from "../src/index";

/**
 * Export regression tests: the package entry (src/index.ts) must export
 * every `use*` hook module under the src directory.
 */

const srcDir = resolve(__dirname, "../src");

const hookNames = readdirSync(srcDir)
  .map((name) => basename(name, extname(name)))
  .filter((name) => name.startsWith("use"))
  .sort();

describe("index", () => {
  it("exports all hooks and nothing else", () => {
    expect(Object.keys(hooks).sort()).toEqual(hookNames);
  });

  it.each(hookNames)("exports %s as a function", (name) => {
    expect(typeof hooks[name as keyof typeof hooks]).toBe("function");
  });
});
