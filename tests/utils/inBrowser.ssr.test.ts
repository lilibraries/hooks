/**
 * @jest-environment node
 */

import { stubGlobal } from "../helpers/mocks";

describe("inBrowser (SSR)", () => {
  it("is false when window is unavailable", async () => {
    jest.resetModules();

    const { default: flag } = await import("../../src/utils/inBrowser");

    expect(flag).toBe(false);
  });

  it("is false when document is unavailable", async () => {
    jest.resetModules();
    stubGlobal("window", {});

    const { default: flag } = await import("../../src/utils/inBrowser");

    expect(flag).toBe(false);
  });

  it("is false when document lacks createElement", async () => {
    jest.resetModules();
    stubGlobal("window", {});
    stubGlobal("document", {});

    const { default: flag } = await import("../../src/utils/inBrowser");

    expect(flag).toBe(false);
  });
});
