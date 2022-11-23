import { EventEmitter } from "@lilib/hooks";

describe("utils/EventEmitter", () => {
  it("should emit callbacks correctly", () => {
    const baseMock = jest.fn();
    const onceMock = jest.fn();

    let sum = 0;
    const paramsMock = jest.fn((param1: number, param2: number) => {
      sum += param1;
      sum += param2;
    });

    const symbol = Symbol("event");
    const emitter = new EventEmitter();

    emitter.on("base", baseMock);
    emitter.once("once", onceMock);
    emitter.on(symbol, paramsMock);

    expect(emitter.count()).toBe(3);
    expect(emitter.count("base")).toBe(1);
    expect(emitter.count("once")).toBe(1);
    expect(emitter.count(symbol)).toBe(1);

    emitter.emit("base");
    emitter.emit("once");
    emitter.emit(symbol, 1, 2);

    expect(emitter.count()).toBe(2);
    expect(emitter.count("base")).toBe(1);
    expect(emitter.count("once")).toBe(0);
    expect(emitter.count(symbol)).toBe(1);

    expect(sum).toBe(3);
    expect(baseMock).toBeCalledTimes(1);
    expect(onceMock).toBeCalledTimes(1);
    expect(paramsMock).toBeCalledTimes(1);

    emitter.off("base", baseMock);
    emitter.emit("base");
    emitter.emit("once");
    emitter.emit(symbol, 3, 4);

    expect(emitter.count()).toBe(1);
    expect(emitter.count("base")).toBe(0);
    expect(emitter.count("once")).toBe(0);
    expect(emitter.count(symbol)).toBe(1);

    expect(sum).toBe(10);
    expect(baseMock).toBeCalledTimes(1);
    expect(onceMock).toBeCalledTimes(1);
    expect(paramsMock).toBeCalledTimes(2);
  });

  it("can't emit callbacks set in listeners synchronously", () => {
    const emitter = new EventEmitter();

    let set = false;
    const mock1 = jest.fn();
    const mock2 = jest.fn(() => {
      if (!set) {
        emitter.on("name", mock1);
        set = true;
      }
    });

    emitter.on("name", mock2);
    emitter.emit("name");

    expect(mock1).toBeCalledTimes(0);
    expect(mock2).toBeCalledTimes(1);

    emitter.emit("name");
    expect(mock1).toBeCalledTimes(1);
    expect(mock2).toBeCalledTimes(2);

    emitter.emit("name");
    expect(mock1).toBeCalledTimes(2);
    expect(mock2).toBeCalledTimes(3);
  });

  it("should check param type correctly", () => {
    const emitter = new EventEmitter();

    const validName = "name";
    const validListener = () => {};
    const invalidName: any = null;
    const invalidListener: any = null;

    expect(() => {
      emitter.on(invalidName, validListener);
    }).toThrow(TypeError);
    expect(() => {
      emitter.on(validName, invalidListener);
    }).toThrow(TypeError);

    expect(() => {
      emitter.off(invalidName, validListener);
    }).toThrow(TypeError);
    expect(() => {
      emitter.off(validName, invalidListener);
    }).toThrow(TypeError);

    expect(() => {
      emitter.once(invalidName, validListener);
    }).toThrow(TypeError);
    expect(() => {
      emitter.once(validName, invalidListener);
    }).toThrow(TypeError);

    expect(() => {
      emitter.emit(invalidName);
    }).toThrow(TypeError);

    expect(() => {
      emitter.count(invalidName);
    }).toThrow(TypeError);
  });

  it("should not throw an error when a event is not listened", () => {
    const emitter = new EventEmitter();

    expect(() => {
      emitter.emit("name", 1, 2, 3);
    }).not.toThrow();
  });

  it("should not block process when listener throw an error", () => {
    const mock = jest.fn(() => {
      throw new Error("error");
    });
    const error = jest.fn();
    jest.spyOn(console, "error").mockImplementation(error);

    const emitter = new EventEmitter();
    emitter.on("name", mock);

    expect(() => {
      emitter.emit("name");
    }).not.toThrow();
    expect(mock).toBeCalledTimes(1);
    expect(error).toBeCalledTimes(1);

    error.mockReset();
  });

  it("should warn correctly when more than max listeners are listened to", () => {
    const emitter = new EventEmitter();
    const warn = jest.fn();
    jest.spyOn(console, "warn").mockImplementation(warn);

    let i = 1;
    for (; i <= 100; i++) {
      emitter.on("event", () => {});
    }
    expect(warn).toBeCalledTimes(0);

    emitter.on("event", () => {});
    expect(warn).toBeCalledTimes(1);

    for (; i <= 110; i++) {
      emitter.on("event", () => {});
    }
    expect(warn).toBeCalledTimes(1);

    warn.mockReset();
  });
});
