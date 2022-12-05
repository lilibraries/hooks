import EventEmitter from "../../src/utils/EventEmitter";

describe("utils/EventEmitter", () => {
  it("has static property", () => {
    expect(EventEmitter.DEFAULT_MAX_LISTENERS).toBeGreaterThan(0);
  });

  it("check event name and listener correctly", () => {
    const emitter = new EventEmitter();

    expect(() => {
      emitter._checkEventName("string");
      emitter._checkEventName(Symbol());
      emitter._checkEventListener(() => {});
    }).not.toThrow();

    expect(() => {
      emitter._checkEventName(undefined);
    }).toThrowError(
      "Event name must be a string or a symbol. Received: undefined."
    );
    expect(() => {
      emitter._checkEventName("");
    }).toThrowError("Event name can not be an empty string.");
    expect(() => {
      emitter._checkEventListener(undefined);
    }).toThrowError("Event listener must be a function. Received: undefined.");

    const validName = "event";
    const validListener = () => {};
    const invalidName: any = null;
    const invalidListener: any = null;

    [
      () => emitter.on(invalidName, validListener),
      () => emitter.on(validName, invalidListener),
      () => emitter.off(invalidName, validListener),
      () => emitter.off(validName, invalidListener),
      () => emitter.once(invalidName, validListener),
      () => emitter.once(validName, invalidListener),
      () => emitter.emit(invalidName),
      () => emitter.getListeners(invalidName),
      () => emitter.getListenersCount(invalidName),
      () => emitter.removeAllListeners(invalidName),
    ].forEach((callback) => {
      expect(callback).toThrow(TypeError);
    });
  });

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

  it("should not throw an error when a event is not listened", () => {
    expect(() => {
      new EventEmitter().emit("name", 1, 2, 3);
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
    let error: Error = new Error();
    const warn = jest.fn().mockImplementation((e: Error) => {
      error = e;
    });
    jest.spyOn(console, "error").mockImplementation(warn);

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
    expect(error.name).toBe("Warning");
    expect(error.message).toBe(
      "More than 100 `event` events are listened to `EventEmitter`, which may lead to memory leaks."
    );

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
    expect(error.name).toBe("Warning");
    expect(error.message).toBe(
      "More than 200 `event` events are listened to `EventEmitter`, which may lead to memory leaks."
    );

    for (; i <= 300; i++) {
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
    expect(emitter.setMaxListeners(10)).toBe(emitter);
    expect(emitter.removeAllListeners()).toBe(emitter);
  });

  it("supports `for` method", () => {
    const emitter = new EventEmitter();
    const key = "key";
    const subKey = () => {};
    const listener = jest.fn();

    emitter.for(key).on("event", listener);
    emitter.for(key).for(subKey).on("event", listener);
    const childEmitter = emitter._emitters.get(key);
    const subChildEmitter = emitter._emitters.get(key)?._emitters.get(subKey);

    expect(emitter._emitters.size).toBe(1);
    expect(emitter._emitters.get(key)?._emitters.size).toBe(1);
    expect(childEmitter).toBeInstanceOf(EventEmitter);
    expect(subChildEmitter).toBeInstanceOf(EventEmitter);

    expect(childEmitter?._forKey).toBe(key);
    expect(childEmitter?._topEmitter).toBe(emitter);
    expect(childEmitter?._parentEmitter).toBe(emitter);
    expect(subChildEmitter?._forKey).toBe(subKey);
    expect(subChildEmitter?._topEmitter).toBe(emitter);
    expect(subChildEmitter?._parentEmitter).toBe(childEmitter);

    emitter.for(key).emit("event");
    expect(listener).toBeCalledTimes(1);
    emitter.for(key).for(subKey).emit("event");
    expect(listener).toBeCalledTimes(2);

    emitter.for(key).for(subKey).off("event", listener);
    expect(emitter._emitters.get(key)?._emitters.size).toBe(0);
    emitter.for(key).off("event", listener);
    expect(emitter._emitters.size).toBe(0);

    emitter.for(key).emit("event");
    expect(listener).toBeCalledTimes(2);
    emitter.for(key).for(subKey).emit("event");
    expect(listener).toBeCalledTimes(2);

    subChildEmitter?.on("event", listener);
    expect(emitter._emitters.size).toBe(1);
    expect(emitter._emitters.get(key)?._emitters.size).toBe(1);
    expect(emitter._emitters.get(key)).toBe(childEmitter);
    expect(emitter._emitters.get(key)?._emitters.get(subKey)).toBe(
      subChildEmitter
    );

    emitter.setMaxListeners(200);
    expect(emitter.getMaxListeners()).toBe(200);
    expect(childEmitter?.getMaxListeners()).toBe(200);
    expect(subChildEmitter?.getMaxListeners()).toBe(200);

    subChildEmitter?.setMaxListeners(300);
    expect(emitter.getMaxListeners()).toBe(300);
    expect(childEmitter?.getMaxListeners()).toBe(300);
    expect(subChildEmitter?.getMaxListeners()).toBe(300);
  });
});
