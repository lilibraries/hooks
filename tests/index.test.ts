import fs from "fs";
import path from "path";
import * as hooks from "@lilib/hooks";

describe("@lilib/hooks", () => {
  const names = fs
    .readdirSync(path.resolve(__dirname, "../src"))
    .map((name) => path.basename(name, path.extname(name)))
    .filter((name) => name.startsWith("use"));

  const configs = fs
    .readdirSync(path.resolve(__dirname, "../src/configs"))
    .map((name) => path.basename(name, path.extname(name)))
    .filter((name) => name.endsWith("Config"));

  [...names, ...configs].forEach((name) => {
    it(`should export ${name}`, () => {
      expect(typeof hooks[name as keyof typeof hooks]).toBe("function");
    });
  });
});
