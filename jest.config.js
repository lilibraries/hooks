module.exports = {
  roots: ["<rootDir>/tests"],
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  resetMocks: true,
  moduleNameMapper: {
    "@lilib/hooks": "<rootDir>/src",
  },
};
