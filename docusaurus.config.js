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
  title: "@lilib/hooks",
  tagline:
    "Practical React hooks for async data, state, effects, callbacks, refs and browser APIs.",
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
  favicon: "favicon.svg",
  themeConfig: {
    navbar: {
      title: "Hooks",
      logo: {
        alt: "Lilib",
        src: "logo.svg",
        srcDark: "logo-dark.svg",
      },
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
    require("./scripts/docsForAi"),
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
