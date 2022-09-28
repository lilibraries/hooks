module.exports = {
  clearMocks: true,
  roots: ["<rootDir>/tests"],
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  testEnvironment: "jsdom",
  moduleNameMapper: { "@lilib/hooks": "<rootDir>/src" },
  setupFilesAfterEnv: ["<rootDir>/configs/jest.setup.ts"],
};
