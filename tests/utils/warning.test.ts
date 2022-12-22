import warning from "../../src/utils/warning";

describe("utils/warning", () => {
  let warn: jest.Mock<void, [e: Error]>;
  let message: string;

  beforeEach(() => {
    warn = jest.fn((msg: any) => {
      message = msg;
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
      variables: { var1: "normal", var2: 100, var3: Symbol("test") },
    });
    expect(message).toBe("Warning: normal 100 Symbol(test)");
  });

  it("supports label option", () => {
    warning(true, "message");
    expect(message).toBe("Warning: message");
    warning(true, "message", { label: "CustomLabel" });
    expect(message).toBe("CustomLabel: message");
  });

  it("supports scope option", () => {
    warning(true, "message", { scope: "Component" });
    expect(message).toBe("Warning(Component): message");
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

  it("supports warnedMessages option", () => {
    const obj = {};
    warning(true, "message", {
      deduplicated: true,
      warnedMessages: obj,
    });
    warning(true, "other message", {
      deduplicated: true,
      warnedMessages: obj,
    });
    expect(obj).toEqual({
      "Warning: message": true,
      "Warning: other message": true,
    });
  });

  it("has once method", () => {
    warning.once(true, "once");
    expect(warn).toBeCalledTimes(1);
    warning.once(true, "once");
    expect(warn).toBeCalledTimes(1);
  });

  it("has deprecated method", () => {
    warning.deprecated(true, "message");
    expect(warn).toBeCalledTimes(1);
    warning.deprecated(true, "message");
    expect(warn).toBeCalledTimes(1);
    expect(message).toBe("Deprecated: message");
  });
});
