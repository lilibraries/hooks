const path = require("path");
const rollup = require("rollup");
const resolve = require("@rollup/plugin-node-resolve").default;
const commonjs = require("@rollup/plugin-commonjs");
const babel = require("@rollup/plugin-babel").babel;
const terser = require("rollup-plugin-terser").terser;

const entryFile = path.resolve(__dirname, "src/index.ts");
const outputDir = path.resolve(__dirname, "dist/umd");

async function bundle(minified) {
  const inputOptions = {
    input: entryFile,
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
    ],
  };

  const result = await rollup.rollup(inputOptions);
  await result.write(createOutputOptions("development"));
  await result.write(createOutputOptions("production"));
}

function createOutputOptions(type) {
  const isProduction = type === "production";

  return {
    file: path.resolve(outputDir, isProduction ? "index.min.js" : "index.js"),
    format: "umd",
    name: "@lilib/hooks",
    globals: {
      react: "React",
      "react-dom": "ReactDOM",
    },
    plugins: [isProduction && terser()].filter(Boolean),
  };
}

bundle();
