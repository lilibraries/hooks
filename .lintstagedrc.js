module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write", "git add --patch"],
  "*.{ts,tsx}": () => "tsc -p tsconfig.json --noEmit",
  "*.{md,mdx,json}": ["prettier --write", "git add --patch"],
};
