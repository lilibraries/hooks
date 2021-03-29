/** @type {import('@docusaurus/types').DocusaurusConfig} */

const path = require("path");

module.exports = {
  title: "@lilib/hooks",
  tagline: "React hooks library.",
  url: "https://lilibraries.github.io/hooks/",
  baseUrl: "/hooks/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "favicon.ico",
  organizationName: "lilibraries",
  projectName: "hooks",
  themeConfig: {
    navbar: {
      title: "@lilib/hooks",
      // logo: {
      //   alt: "lilib",
      //   src: "logo.svg",
      // },
      items: [
        {
          href: "https://github.com/lilibraries/hooks",
          label: "Github",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} 李蔚生. Code licensed MIT, docs CC BY 3.0. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
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
