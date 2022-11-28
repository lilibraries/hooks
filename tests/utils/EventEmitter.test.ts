import EventEmitter from "../../src/utils/EventEmitter";

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

    expect(sum).toBe(0);
    expect(baseMock).toBeCalledTimes(0);
    expect(onceMock).toBeCalledTimes(0);
    expect(paramsMock).toBeCalledTimes(0);

    emitter.emit("base");
    emitter.emit("once");
    emitter.emit(symbol, 1, 2);

    expect(sum).toBe(3);
    expect(baseMock).toBeCalledTimes(1);
    expect(onceMock).toBeCalledTimes(1);
    expect(paramsMock).toBeCalledTimes(1);

    emitter.off("base", baseMock);
    emitter.emit("base");
    emitter.emit("once");
    emitter.emit(symbol, 3, 4);

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
      emitter.checkEventName(invalidName);
    }).toThrow(TypeError);
    expect(() => {
      emitter.checkEventName("");
    }).toThrow(TypeError);
    expect(() => {
      emitter.checkEventListener(invalidListener);
    }).toThrow(TypeError);

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
      emitter.getListeners(invalidName);
    }).toThrow(TypeError);

    expect(() => {
      emitter.getListenersCount(invalidName);
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

  it("should set maxListeners correctly", () => {
    const emitter = new EventEmitter();
    const warn = jest.fn();
    jest.spyOn(console, "warn").mockImplementation(warn);

    expect(EventEmitter.DEFAULT_MAX_LISTENERS).toBe(100);
    expect(emitter.getMaxListeners()).toBe(EventEmitter.DEFAULT_MAX_LISTENERS);

    let i = 1;
    for (; i <= 100; i++) {
      emitter.on("event", () => {});
    }
    expect(warn).toBeCalledTimes(0);

    i++;
    emitter.on("event", () => {});
    expect(warn).toBeCalledTimes(1);

    for (; i <= 110; i++) {
      emitter.on("event", () => {});
    }
    expect(warn).toBeCalledTimes(1);

    emitter.setMaxListeners(200);
    for (; i <= 200; i++) {
      emitter.on("event", () => {});
    }
    expect(warn).toBeCalledTimes(1);

    i++;
    emitter.on("event", () => {});
    expect(warn).toBeCalledTimes(2);

    for (; i <= 210; i++) {
      emitter.on("event", () => {});
    }
    expect(warn).toBeCalledTimes(2);

    warn.mockReset();
  });

  it("should remove all listeners correctly", () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();

    const emitter = new EventEmitter();
    emitter.on("event1", mock1);
    emitter.on("event1", mock1);
    emitter.on("event2", mock2);
    emitter.on("event2", mock2);

    emitter.emit("event1");
    emitter.emit("event2");
    expect(mock1).toBeCalledTimes(2);
    expect(mock2).toBeCalledTimes(2);

    emitter.removeAllListeners("event1");
    emitter.emit("event1");
    emitter.emit("event2");
    expect(mock1).toBeCalledTimes(2);
    expect(mock2).toBeCalledTimes(4);

    emitter.removeAllListeners();
    emitter.emit("event1");
    emitter.emit("event2");
    expect(mock1).toBeCalledTimes(2);
    expect(mock2).toBeCalledTimes(4);
  });

  it("get event names correctly", () => {
    const emitter = new EventEmitter();

    emitter.on("1", () => {});
    emitter.on("1", () => {});
    emitter.on("2", () => {});
    emitter.once("3", () => {});
    expect(emitter.getEventNames()).toEqual(["1", "2", "3"]);

    emitter.emit("1");
    emitter.emit("2");
    emitter.emit("3");
    expect(emitter.getEventNames()).toEqual(["1", "2"]);
  });

  it("should get listeners correctly", () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    const emitter = new EventEmitter();

    emitter.on("event", mock1);
    emitter.once("event", mock2);
    expect(emitter.getListeners("event")).toEqual([mock1, mock2]);
  });

  it("should get listeners count correctly", () => {
    const emitter = new EventEmitter();
    const mock = jest.fn();

    emitter.on("event1", mock);
    emitter.on("event1", mock);
    emitter.once("event2", mock);
    expect(emitter.getListenersCount()).toBe(3);
    expect(emitter.getListenersCount("event1")).toBe(2);
    expect(emitter.getListenersCount("event2")).toBe(1);

    emitter.emit("event1");
    emitter.emit("event2");
    expect(emitter.getListenersCount()).toBe(2);
    expect(emitter.getListenersCount("event1")).toBe(2);
    expect(emitter.getListenersCount("event2")).toBe(0);

    emitter.off("event1", mock);
    expect(emitter.getListenersCount()).toBe(1);
    expect(emitter.getListenersCount("event1")).toBe(1);
    expect(emitter.getListenersCount("event2")).toBe(0);
  });

  it("some methods should return this", () => {
    const emitter = new EventEmitter();

    expect(emitter.on("event", () => {})).toBe(emitter);
    expect(emitter.once("event", () => {})).toBe(emitter);
    expect(emitter.off("event", () => {})).toBe(emitter);
    expect(emitter.emit("event")).toBe(emitter);
    expect(emitter.removeAllListeners()).toBe(emitter);
    expect(emitter.setMaxListeners(10)).toBe(emitter);
  });
});
