import isString from "lodash/isString";
import isSymbol from "lodash/isSymbol";
import isFunction from "lodash/isFunction";

type DefaultName = string | symbol;
type DefaultListener = (...args: any[]) => void;
type ListenerWrapper<T extends DefaultListener> = T & { __RAW_LISTENER__?: T };

class EventEmitter<
  Name extends DefaultName = DefaultName,
  Listener extends DefaultListener = DefaultListener
> {
  static DEFAULT_MAX_LISTENERS = 100;

  private listeners: {
    [name: PropertyKey]: ListenerWrapper<Listener>[] | undefined;
  } = Object.create(null);

  private maxListeners = EventEmitter.DEFAULT_MAX_LISTENERS;
  protected readonly warnedMessages: { [message: string]: boolean } = {};

  protected checkEventName(name: unknown) {
    if (!isString(name) && !isSymbol(name)) {
      throw new TypeError(
        `Event name must be a string or a symbol. Received: ${typeof name}.`
      );
    }
    if (name === "") {
      throw new TypeError("Event name can not be an empty string.");
    }
  }

  protected checkEventListener(listener: unknown) {
    if (!isFunction(listener)) {
      throw new TypeError(
        `Event listener must be a function. Received: ${typeof listener}.`
      );
    }
  }

  getMaxListeners() {
    return this.maxListeners;
  }

  setMaxListeners(count: number) {
    this.maxListeners = count;
    return this;
  }

  on(name: Name, listener: Listener) {
    this.checkEventName(name);
    this.checkEventListener(listener);

    let listeners = this.listeners[name];
    if (listeners) {
      listeners.push(listener);
    } else {
      listeners = this.listeners[name] = [listener];
    }

    if (listeners.length > this.maxListeners) {
      const message =
        `More than ${this.maxListeners} \`${String(name)}\`` +
        ` events are listened to, which may lead to memory leaks.`;
      if (!this.warnedMessages[message]) {
        console.warn(message);
        this.warnedMessages[message] = true;
      }
    }

    return this;
  }

  once(name: Name, listener: Listener) {
    this.checkEventName(name);
    this.checkEventListener(listener);

    const wrapper = (...args: Parameters<Listener>[]) => {
      this.off(name, wrapper.__RAW_LISTENER__);
      wrapper.__RAW_LISTENER__(...args);
    };
    wrapper.__RAW_LISTENER__ = listener;

    this.on(name, wrapper as ListenerWrapper<Listener>);
    return this;
  }

  off(name: Name, listener: Listener) {
    this.checkEventName(name);
    this.checkEventListener(listener);

    const listeners = this.listeners[name];
    if (listeners) {
      let position = -1;
      for (let i = listeners.length - 1; i >= 0; i--) {
        if (
          listeners[i] === listener ||
          listeners[i].__RAW_LISTENER__ === listener
        ) {
          position = i;
          break;
        }
      }
      if (position >= 0) {
        listeners.splice(position, 1);
      }
      if (listeners.length === 0) {
        delete this.listeners[name];
      }
    }

    return this;
  }

  emit(name: Name, ...args: any[]) {
    this.checkEventName(name);

    let listeners = this.listeners[name];
    if (listeners) {
      listeners = [...listeners];
      for (let i = 0; i < listeners.length; i++) {
        try {
          listeners[i](...args);
        } catch (error) {
          console.error(error);
        }
      }
    }

    return this;
  }

  getEventNames() {
    return [
      ...Object.getOwnPropertyNames(this.listeners),
      ...Object.getOwnPropertySymbols(this.listeners),
    ];
  }

  getListeners(name: Name) {
    this.checkEventName(name);
    return (this.listeners[name] || []).map((listener) => {
      return listener.__RAW_LISTENER__ || listener;
    });
  }

  getListenersCount(name?: Name): number {
    let sum = 0;

    if (name !== undefined) {
      this.checkEventName(name);
      sum = this.listeners[name]?.length || 0;
    } else {
      this.getEventNames().forEach((name) => {
        sum += this.listeners[name]?.length || 0;
      });
    }

    return sum;
  }

  removeAllListeners(name?: Name) {
    if (name !== undefined) {
      this.checkEventName(name);
      delete this.listeners[name];
    } else {
      this.listeners = Object.create(null);
    }
    return this;
  }
}

export default EventEmitter;
