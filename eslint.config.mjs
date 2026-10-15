import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import testingLibrary from "eslint-plugin-testing-library";
import jestPlugin from "eslint-plugin-jest";
import prettier from "eslint-config-prettier/flat";

export default defineConfig(
  {
    ignores: ["dist/**", "build/**", ".docusaurus/**", ".test-deps/**", "coverage/**", ".nyc_output/**"],
  },
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    extends: [tseslint.configs.recommended, reactHooks.configs.flat["recommended-latest"]],
    rules: {
      // Allow explicit any in generic hook function constraints and edge-case tests while keeping strict TypeScript checks.
      "@typescript-eslint/no-explicit-any": "off",
      // Low-level hooks store the latest values in refs, so React Compiler's ref restrictions do not apply.
      "react-hooks/refs": "off",
    },
  },
  {
    files: ["**/*.{js,cjs}"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },
  {
    files: [
      "babel.config.js",
      "babel.preset.js",
      "docusaurus.config.js",
      "jest.config.js",
      "docs/sidebars.js",
      "eslint.config.mjs",
      "rollup.config.mjs",
      "scripts/**/*.mjs",
    ],
    languageOptions: {
      globals: {
        Buffer: "readonly",
        __dirname: "readonly",
        console: "readonly",
        exports: "writable",
        module: "readonly",
        process: "readonly",
        require: "readonly",
      },
    },
  },
  {
    files: ["tests/**/*.{js,jsx,ts,tsx}"],
    extends: [testingLibrary.configs["flat/react"], jestPlugin.configs["flat/recommended"]],
    rules: {
      "testing-library/no-node-access": "off",
      "testing-library/no-wait-for-multiple-assertions": "off",
      "testing-library/render-result-naming-convention": "off",
    },
  },
  prettier,
);
