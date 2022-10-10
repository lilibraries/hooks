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
            },
      ],
      [
        "@babel/preset-react",
        {
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
