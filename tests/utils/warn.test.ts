import warn from "../../src/utils/warn";

describe("warn", () => {
  // `warn` deduplicates in a module-level Set that is never reset, so every message
  // used in this file must be unique.
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    errorSpy.mockRestore();
  });

  it("reports a falsy condition", () => {
    warn(false, "[test] condition is falsy");

    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledWith("[test] condition is falsy");
  });

  it("stays silent when the condition holds", () => {
    warn(true, "[test] condition holds");

    expect(errorSpy).not.toHaveBeenCalled();
  });

  it("replaces the %s placeholders with the arguments", () => {
    warn(false, "[test] `%s` must be a number, but received `%s`.", "value", 0);

    expect(errorSpy).toHaveBeenCalledWith("[test] `value` must be a number, but received `0`.");
  });

  it("reports the same message once", () => {
    warn(false, "[test] duplicated message");
    warn(false, "[test] duplicated message");

    expect(errorSpy).toHaveBeenCalledTimes(1);
  });

  it("reports different messages separately", () => {
    warn(false, "[test] key `%s` is invalid", "a");
    warn(false, "[test] key `%s` is invalid", "b");

    expect(errorSpy).toHaveBeenCalledTimes(2);
    expect(errorSpy).toHaveBeenLastCalledWith("[test] key `b` is invalid");
  });
});
