import path from "node:path";
import { fileURLToPath } from "node:url";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import license from "rollup-plugin-license";
import replace from "@rollup/plugin-replace";

const isProduction = process.env.NODE_ENV === "production";
const dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  input: path.resolve(dirname, "src/index.ts"),
  external: ["react", "react-dom"],
  plugins: [
    nodeResolve({
      extensions: [".mjs", ".js", ".json", ".node", ".ts", ".tsx"],
    }),
    commonjs(),
    babel({
      presets: [[path.resolve(dirname, "./babel.preset.js"), { module: "esm" }]],
      babelHelpers: "runtime",
      extensions: [".ts", ".tsx"],
    }),
    replace({
      objectGuards: true,
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify(isProduction ? "production" : "development"),
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
        license({
          banner: {
            commentStyle: "ignored",
            content: [
              "@license @lilib/hooks",
              "Copyright (c) 2021-present 李蔚生 (LeeWeisheng).",
              "",
              "This source code is licensed under the MIT license found in the",
              "LICENSE file in the root directory of this source tree.",
            ].join("\n"),
          },
          ...(isProduction && {
            thirdParty: {
              output: path.resolve(dirname, "dist/umd/THIRD-PARTY-LICENSES.txt"),
            },
          }),
        }),
      ].filter(Boolean),
    },
  ],
};
