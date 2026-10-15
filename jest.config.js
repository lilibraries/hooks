const fs = require("fs");
const path = require("path");

const supportedReactVersions = ["16", "17", "18", "19"];
const reactVersion = process.env.REACT_VERSION;
const testDepsDir = reactVersion ? path.resolve(__dirname, ".test-deps", `react${reactVersion}`, "node_modules") : null;

const moduleNameMapper = {
  "@lilib/hooks": "<rootDir>/src",
};

if (reactVersion) {
  if (!supportedReactVersions.includes(reactVersion)) {
    throw new Error(
      `Unsupported REACT_VERSION "${reactVersion}", supported versions: ${supportedReactVersions.join(", ")}.`,
    );
  }
  if (!fs.existsSync(testDepsDir)) {
    throw new Error(
      `Test dependencies for React ${reactVersion} are not prepared at "${testDepsDir}". ` +
        "Run `node scripts/prepareTestDeps.mjs` first.",
    );
  }

  const dep = (name) => path.join(testDepsDir, name);
  Object.assign(moduleNameMapper, {
    "^react$": dep("react"),
    "^react/(.*)$": dep(path.join("react", "$1")),
    "^react-dom$": dep("react-dom"),
    "^react-dom/(.*)$": dep(path.join("react-dom", "$1")),
    "^scheduler$": dep("scheduler"),
    "^scheduler/(.*)$": dep(path.join("scheduler", "$1")),
    "^@testing-library/react$": dep("@testing-library/react"),
    "^@testing-library/react-hooks$": dep("@testing-library/react-hooks"),
    "^@testing-library/dom$": dep("@testing-library/dom"),
  });
}

module.exports = {
  // Four React versions run in parallel, sharing the worker budget evenly to avoid each group consuming nearly all CPUs.
  maxWorkers: "25%",
  // When starting other versions in parallel, workers exiting normally may also exceed the default 500ms.
  workerGracefulExitTimeout: 5000,
  clearMocks: true,
  roots: ["<rootDir>/tests"],
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  testEnvironment: "<rootDir>/tests/helpers/environment.ts",
  testEnvironmentOptions: { url: "https://localhost/" },
  moduleNameMapper,
  setupFilesAfterEnv: ["<rootDir>/tests/helpers/setup.ts"],
  fakeTimers: {
    doNotFake: [
      "hrtime",
      "nextTick",
      "performance",
      "queueMicrotask",
      "requestAnimationFrame",
      "cancelAnimationFrame",
      "requestIdleCallback",
      "cancelIdleCallback",
    ],
  },
};
