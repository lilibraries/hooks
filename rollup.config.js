const path = require("path");
const resolve = require("@rollup/plugin-node-resolve").default;
const commonjs = require("@rollup/plugin-commonjs");
const babel = require("@rollup/plugin-babel").babel;
const terser = require("rollup-plugin-terser").terser;
const license = require("rollup-plugin-license");

module.exports = {
  input: path.resolve(__dirname, "src/index.ts"),
  external: ["react", "react-dom"],
  plugins: [
    resolve({
      extensions: [".mjs", ".js", ".json", ".node", ".ts", ".tsx"],
    }),
    commonjs(),
    babel({
      presets: [
        [
          path.resolve(__dirname, "./configs/babel.preset.js"),
          { module: "esm" },
        ],
      ],
      babelHelpers: "runtime",
      extensions: [".ts", ".tsx"],
    }),
  ],
  output: [
    {
      file: "dist/umd/index.js",
      format: "umd",
      name: "@lilib/hooks",
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
    },
    {
      file: "dist/umd/index.min.js",
      format: "umd",
      name: "@lilib/hooks",
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
      plugins: [
        terser(),
        license({
          thirdParty: {
            output: path.resolve(__dirname, "dist/umd/dependencies.txt"),
            includePrivate: true,
            allow: {
              test: "MIT",
              failOnUnlicensed: true,
              failOnViolation: true,
            },
          },
        }),
      ],
    },
  ],
};
