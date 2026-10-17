/** @type {import('@docusaurus/types').DocusaurusConfig} */

const path = require("path");

/**
 * Local plugin providing webpack module aliases.
 */
const moduleAliasPlugin = function (context, { alias }) {
  return {
    name: "docusaurus-plugin-module-alias",
    configureWebpack(config) {
      config.resolve.alias = { ...config.resolve.alias, ...alias };
      return {};
    },
  };
};

module.exports = {
  title: "Hooks",
  url: "https://lilibraries.github.io/",
  baseUrl: "/hooks/",
  onBrokenLinks: "throw",
  onDuplicateRoutes: "throw",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "throw",
    },
  },
  organizationName: "lilibraries",
  projectName: "hooks",
  themeConfig: {
    navbar: {
      title: "Hooks",
      items: [
        {
          href: "https://github.com/lilibraries/hooks",
          label: "Github",
          position: "right",
        },
      ],
    },
    footer: {
      copyright: `Copyright © 2021-present <a href="https://github.com/LeeWeisheng" target="_blank" rel="noopener noreferrer">李蔚生 (LeeWeisheng)</a> · MIT License`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./docs/sidebars.js"),
        },
      },
    ],
  ],
  plugins: [
    [
      moduleAliasPlugin,
      {
        alias: {
          "@lilib/hooks": path.resolve(__dirname, "./src"),
        },
      },
    ],
  ],
};
