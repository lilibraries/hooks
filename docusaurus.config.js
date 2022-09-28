/** @type {import('@docusaurus/types').DocusaurusConfig} */

const path = require("path");

module.exports = {
  title: "@lilib/hooks",
  url: "https://lilibraries.github.io/",
  baseUrl: "/hooks/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  onDuplicateRoutes: "throw",
  organizationName: "lilibraries",
  projectName: "hooks",
  themeConfig: {
    navbar: {
      title: "@lilib/hooks",
      items: [
        {
          href: "https://github.com/lilibraries/hooks",
          label: "Github",
          position: "right",
        },
      ],
    },
    footer: {
      copyright: `Copyright © 李蔚生. Code licensed MIT, docs CC BY 4.0.`,
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
      "docusaurus-plugin-module-alias",
      {
        alias: {
          "@lilib/hooks": path.resolve(__dirname, "./src"),
        },
      },
    ],
  ],
};
