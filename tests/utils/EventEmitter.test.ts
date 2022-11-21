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

    const ee = new EventEmitter();
    const symbol = Symbol("event");
    ee.on("base", baseMock);
    ee.once("once", onceMock);
    ee.on(symbol, paramsMock);

    ee.emit("base");
    ee.emit("once");
    ee.emit(symbol, 1, 2);

    expect(baseMock).toBeCalledTimes(1);
    expect(onceMock).toBeCalledTimes(1);
    expect(paramsMock).toBeCalledTimes(1);
    expect(sum).toBe(3);

    ee.off("base", baseMock);
    ee.emit("base");
    ee.emit("once");
    ee.emit(symbol, 3, 4);

    expect(baseMock).toBeCalledTimes(1);
    expect(onceMock).toBeCalledTimes(1);
    expect(paramsMock).toBeCalledTimes(2);
    expect(sum).toBe(10);
  });

  it("can't emit callbacks set in listeners at the same time", () => {
    const ee = new EventEmitter();
    let set = false;
    const mock1 = jest.fn();
    const mock2 = jest.fn(() => {
      if (!set) {
        ee.on("name", mock1);
        set = true;
      }
    });

    ee.on("name", mock2);
    ee.emit("name");

    expect(mock1).toBeCalledTimes(0);
    expect(mock2).toBeCalledTimes(1);

    ee.emit("name");
    expect(mock1).toBeCalledTimes(1);
    expect(mock2).toBeCalledTimes(2);

    ee.emit("name");
    expect(mock1).toBeCalledTimes(2);
    expect(mock2).toBeCalledTimes(3);
  });

  it("should check param type correctly", () => {
    const ee = new EventEmitter();

    const validName = "name";
    const validListener = () => {};

    const invalidName: any = undefined;
    const invalidListener: any = undefined;

    expect(() => {
      ee.on(invalidName, validListener);
    }).toThrow(TypeError);
    expect(() => {
      ee.on(validName, invalidListener);
    }).toThrow(TypeError);

    expect(() => {
      ee.off(invalidName, validListener);
    }).toThrow(TypeError);
    expect(() => {
      ee.off(validName, invalidListener);
    }).toThrow(TypeError);

    expect(() => {
      ee.once(invalidName, validListener);
    }).toThrow(TypeError);
    expect(() => {
      ee.once(validName, invalidListener);
    }).toThrow(TypeError);

    expect(() => {
      ee.emit(invalidName);
    }).toThrow(TypeError);
  });

  it("should not throw an error when a event is not listened", () => {
    const ee = new EventEmitter();

    expect(() => {
      ee.emit("name", 1, 2, 3);
    }).not.toThrow();
  });

  it("should not block process when listener throw an error", () => {
    const ee = new EventEmitter();
    const mock = jest.fn(() => {
      throw new Error("error");
    });
    const error = jest.fn();
    jest.spyOn(console, "error").mockImplementation(error);

    ee.on("name", mock);
    expect(() => {
      ee.emit("name");
    }).not.toThrow();
    expect(mock).toBeCalledTimes(1);
    expect(error).toBeCalledTimes(1);
    error.mockReset();
  });
});
