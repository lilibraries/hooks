import warning from "../../src/utils/warning";

describe("utils/warning", () => {
  let warn: jest.Mock<void, [e: Error]>;
  let error: Error;

  beforeEach(() => {
    warn = jest.fn((e: Error) => {
      error = e;
    });
    jest.spyOn(console, "error").mockImplementation(warn);
  });

  afterEach(() => {
    warn.mockReset();
  });

  it("warns on condition", () => {
    warning(false, "message");
    expect(warn).toBeCalledTimes(0);
    warning(true, "message");
    expect(warn).toBeCalledTimes(1);
  });

  it("supports variables", () => {
    warning(true, "{var1} {var2} {var3}", {
      variables: {
        var1: "normal",
        var2: 100,
        var3: Symbol("label"),
      },
    });
    expect(error.message).toBe("normal 100 Symbol(label)");
  });

  it("supports label option", () => {
    warning(true, "message");
    expect(error.name).toBe("Warning");
    warning(true, "message", { label: "CustomLabel" });
    expect(error.name).toBe("CustomLabel");
  });

  it("supports scope option", () => {
    warning(true, "message", { scope: "Component" });
    expect(error.name).toBe("Warning(Component)");
  });

  it("supports printer option", () => {
    const printer = jest.fn();
    warning(true, "message", { printer });
    expect(warn).toBeCalledTimes(0);
    expect(printer).toBeCalledTimes(1);
  });

  it("supports deduplicated option", () => {
    warning(true, "deduplicated");
    expect(warn).toBeCalledTimes(1);
    warning(true, "deduplicated");
    expect(warn).toBeCalledTimes(2);
    warning(true, "deduplicated", { deduplicated: true });
    expect(warn).toBeCalledTimes(3);
    warning(true, "deduplicated", { deduplicated: true });
    expect(warn).toBeCalledTimes(3);
  });

  it("supports warnedMessagesMap option", () => {
    const obj = {};
    warning(true, "message", {
      deduplicated: true,
      warnedMessagesMap: obj,
    });
    warning(true, "other message", {
      deduplicated: true,
      warnedMessagesMap: obj,
    });
    expect(obj).toEqual({
      "Warning: message": true,
      "Warning: other message": true,
    });
  });

  it("supports captureStackTraceConstructor option", () => {
    function testPrintFunction(capture?: true) {
      warning(true, "message", {
        captureStackTraceConstructor: capture ? test : undefined,
      });
    }
    testPrintFunction();
    expect(error.stack).toMatch("at testPrintFunction");
    testPrintFunction(true);
    expect(error.stack).not.toMatch("at testPrintFunction");
  });

  it("has once method", () => {
    warning.once(true, "once");
    expect(warn).toBeCalledTimes(1);
    warning.once(true, "once");
    expect(warn).toBeCalledTimes(1);
    expect(error.stack).not.toMatch("at Function.once");
  });

  it("has deprecated method", () => {
    warning.deprecated(true, "deprecated");
    expect(warn).toBeCalledTimes(1);
    warning.deprecated(true, "deprecated");
    expect(warn).toBeCalledTimes(1);
    expect(error.name).toBe("Deprecated");
    expect(error.stack).not.toMatch("at Function.deprecated");
  });
});
