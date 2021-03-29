import fs from "fs";
import path from "path";
import * as hooks from "@lilib/hooks";

describe("@lilib/hooks", () => {
  const names = fs
    .readdirSync(path.resolve(__dirname, "../src"))
    .map((name) => path.basename(name, path.extname(name)))
    .filter((name) => name.startsWith("use"));

  names.forEach((name) => {
    it(`should export ${name}`, () => {
      expect(typeof hooks[name as keyof typeof hooks]).toBe("function");
    });
  });
});
