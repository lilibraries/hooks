// Node's ESM resolver requires explicit file extensions for relative specifiers and for subpath
// imports of packages without an `exports` map (e.g. `lodash/isFunction`), unlike bundlers.
function addJsExtensionToImports() {
  return {
    visitor: {
      "ImportDeclaration|ExportNamedDeclaration|ExportAllDeclaration"(path) {
        const { source } = path.node;
        if (!source) {
          return;
        }
        const isRelative = source.value.startsWith(".");
        const isLodashSubpath = source.value.startsWith("lodash/");
        if ((isRelative || isLodashSubpath) && !/\.[cm]?js$/.test(source.value)) {
          source.value += ".js";
        }
      },
    },
  };
}

module.exports = function (api, options = {}) {
  const isTest = api.env("test");
  const isDevelopment = api.env("development");

  const { module } = options;
  const isCJS = module === "cjs";
  const isESM = module === "esm";

  return {
    presets: [
      [
        "@babel/preset-env",
        isTest
          ? {
              bugfixes: true,
              targets: { node: "current" },
            }
          : {
              bugfixes: true,
              modules: isCJS ? "cjs" : isESM ? false : "auto",
              forceAllTransforms: true,
              ignoreBrowserslistConfig: true,
            },
      ],
      [
        "@babel/preset-react",
        {
          runtime: "classic",
          development: isCJS || isESM ? false : isTest || isDevelopment,
        },
      ],
      [
        "@babel/preset-typescript",
        {
          isTSX: true,
          allExtensions: true,
        },
      ],
    ],
    plugins: [
      ...(isESM ? [addJsExtensionToImports] : []),
      [
        "@babel/plugin-transform-runtime",
        {
          corejs: 3,
          version: require("@babel/runtime-corejs3/package.json").version,
        },
      ],
    ],
  };
};
