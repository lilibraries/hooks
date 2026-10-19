import KeyedEmitter from "../../src/utils/KeyedEmitter";

describe("KeyedEmitter", () => {
  let emitter: KeyedEmitter;

  beforeEach(() => {
    emitter = new KeyedEmitter();
  });

  it("reuses the same child emitter once it has a listener", () => {
    const child = emitter.for("key");
    child.on("event", () => {});

    expect(emitter.for("key")).toBe(child);
  });

  it("peek returns the registered child emitter without creating one", () => {
    expect(emitter.peek("key")).toBeUndefined();

    const child = emitter.for("key");
    child.on("event", () => {});

    expect(emitter.peek("key")).toBe(child);
  });

  it("peek returns undefined again after the child emitter is pruned", () => {
    const child = emitter.for("key");
    const listener = () => {};
    child.on("event", listener);
    child.off("event", listener);

    expect(emitter.peek("key")).toBeUndefined();
  });

  it("does not cache child emitters without listeners", () => {
    const first = emitter.for("key");

    expect(emitter.for("key")).not.toBe(first);
  });

  it("emits events to listeners of the same key", () => {
    const listener = jest.fn();
    emitter.for("key").on("event", listener);

    emitter.for("key").emit("event", 1, 2);

    expect(listener).toHaveBeenCalledWith(1, 2);
  });

  it("isolates listeners of different keys from each other", () => {
    const listenerA = jest.fn();
    const listenerB = jest.fn();
    emitter.for("a").on("event", listenerA);
    emitter.for("b").on("event", listenerB);

    emitter.for("a").emit("event", 1);

    expect(listenerA).toHaveBeenCalledWith(1);
    expect(listenerB).not.toHaveBeenCalled();
  });

  it("does not bubble child events to the parent", () => {
    const listener = jest.fn();
    emitter.on("event", listener);

    emitter.for("key").emit("event");

    expect(listener).not.toHaveBeenCalled();
  });

  it("once listeners fire only once", () => {
    const listener = jest.fn();
    emitter.for("key").once("event", listener);

    emitter.for("key").emit("event", 1);
    emitter.for("key").emit("event", 2);

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith(1);
  });

  it("addListener is an alias for on", () => {
    const listener = jest.fn();
    emitter.for("key").addListener("event", listener);

    emitter.for("key").emit("event");

    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("off without a listener removes every listener of the event", () => {
    const listenerA = jest.fn();
    const listenerB = jest.fn();
    const child = emitter.for("key");
    child.on("event", listenerA);
    child.on("event", listenerB);

    child.off("event");
    child.emit("event");

    expect(listenerA).not.toHaveBeenCalled();
    expect(listenerB).not.toHaveBeenCalled();
  });

  it("supports symbol keys and symbol event names", () => {
    const key = Symbol("key");
    const event = Symbol("event");
    const listener = jest.fn();
    const child = emitter.for(key);
    child.on(event, listener);

    child.emit(event, 1);

    expect(listener).toHaveBeenCalledWith(1);
    expect(emitter.for(key)).toBe(child);
  });

  describe("automatic pruning", () => {
    it("prunes a child emitter after its last listener is removed", () => {
      const child = emitter.for("key");
      const listener = () => {};
      child.on("event", listener);
      expect(emitter.for("key")).toBe(child);

      child.off("event", listener);

      expect(emitter.for("key")).not.toBe(child);
    });

    it("prunes a child emitter after a once listener fires", () => {
      const child = emitter.for("key");
      child.once("event", () => {});
      expect(emitter.for("key")).toBe(child);

      child.emit("event");

      expect(emitter.for("key")).not.toBe(child);
    });

    it("prunes a child emitter when removeAllListeners is called", () => {
      const child = emitter.for("key");
      child.on("event", () => {});
      expect(emitter.for("key")).toBe(child);

      child.removeAllListeners();

      expect(emitter.for("key")).not.toBe(child);
    });

    it("prunes empty child emitters up the hierarchy", () => {
      const outer = emitter.for("outer");
      const inner = outer.for("inner");
      inner.on("event", () => {});

      inner.removeAllListeners();

      expect(emitter.for("outer")).not.toBe(outer);
    });

    it("keeps a child emitter while it still has grandchild emitters", () => {
      const outer = emitter.for("outer");
      outer.for("inner").on("event", () => {});

      outer.removeAllListeners();

      expect(emitter.for("outer")).toBe(outer);
    });

    it("prunes a child emitter while its parent retains its own listeners", () => {
      const parentListener = jest.fn();
      emitter.on("parent-event", parentListener);

      const child = emitter.for("key");
      child.on("event", () => {});
      child.removeAllListeners();

      expect(emitter.for("key")).not.toBe(child);
      expect(parentListener).not.toHaveBeenCalled();
    });

    it("re-prunes when a removed listener's child is re-attached", () => {
      const outer = emitter.for("outer");
      const inner = outer.for("inner");
      const listener = () => {};
      inner.on("event", listener);
      expect(emitter.for("outer")).toBe(outer);

      inner.off("event", listener);
      expect(emitter.for("outer")).not.toBe(outer);

      // Attaching again through a fresh child re-registers it in the hierarchy
      const freshInner = emitter.for("outer").for("inner");
      freshInner.on("event", () => {});
      expect(emitter.for("outer").for("inner")).toBe(freshInner);
    });
  });
});
