const env = process.env.BABEL_ENV || process.env.NODE_ENV;
const isTest = env === "test";

module.exports = {
  presets: isTest
    ? ["./babel.preset.js"]
    : [require.resolve("@docusaurus/core/lib/babel/preset")],
};
