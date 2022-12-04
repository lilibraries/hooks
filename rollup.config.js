const path = require("path");
const resolve = require("@rollup/plugin-node-resolve").default;
const commonjs = require("@rollup/plugin-commonjs");
const babel = require("@rollup/plugin-babel").babel;
const terser = require("rollup-plugin-terser").terser;
const license = require("rollup-plugin-license");
const replace = require("@rollup/plugin-replace");
const isProduction = process.env.NODE_ENV === "production";

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
        [path.resolve(__dirname, "./babel.preset.js"), { module: "esm" }],
      ],
      babelHelpers: "runtime",
      extensions: [".ts", ".tsx"],
    }),
    replace({
      objectGuards: true,
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify(
        isProduction ? "production" : "development"
      ),
    }),
  ],
  output: [
    {
      file: isProduction ? "dist/umd/index.min.js" : "dist/umd/index.js",
      format: "umd",
      name: "@lilib/hooks",
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
      plugins: [
        isProduction && terser(),
        isProduction &&
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
      ].filter(Boolean),
    },
  ],
};
