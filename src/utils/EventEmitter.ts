import isString from "./isString";
import isSymbol from "./isSymbol";
import isFunction from "./isFunction";

type EventName = string | symbol;

interface EventListener {
  (...args: any[]): void;
}
interface EventListenerWrapper extends EventListener {
  __RAW_LISTENER__?: EventListener;
}

class EventEmitter {
  static DEFAULT_MAX_LISTENERS = 100;

  private listeners: {
    [name: EventName]: EventListenerWrapper[] | undefined;
  } = Object.create(null);

  private maxListeners = EventEmitter.DEFAULT_MAX_LISTENERS;
  private readonly warnedMessages: { [message: string]: boolean } = {};

  getMaxListeners() {
    return this.maxListeners;
  }

  setMaxListeners(max: number) {
    this.maxListeners = max;
  }

  checkEventName(name: unknown) {
    if (!isString(name) && !isSymbol(name)) {
      throw new TypeError(
        `Event name must be a string or a symbol. Received: ${typeof name}`
      );
    }
    if (name === "") {
      throw new TypeError("Event name can not be an empty string.");
    }
  }

  checkEventListener(listener: unknown) {
    if (!isFunction(listener)) {
      throw new TypeError(
        `Event listener must be a function. Received: ${typeof listener}`
      );
    }
  }

  on(name: EventName, listener: EventListener) {
    this.checkEventName(name);
    this.checkEventListener(listener);

    let listeners = this.listeners[name];
    if (listeners) {
      listeners.push(listener);
    } else {
      listeners = this.listeners[name] = [listener];
    }

    if (listeners.length > this.maxListeners) {
      // prettier-ignore
      const message = `More than ${this.maxListeners} \`${String(name)}\` events are listened to, which may lead to memory leaks.`;
      if (!this.warnedMessages[message]) {
        console.warn(message);
        this.warnedMessages[message] = true;
      }
    }

    return this;
  }

  once(name: EventName, listener: EventListener) {
    this.checkEventName(name);
    this.checkEventListener(listener);

    const wrapper: EventListenerWrapper & {
      __RAW_LISTENER__: EventListener;
    } = (...args: any[]) => {
      this.off(name, wrapper.__RAW_LISTENER__);
      wrapper.__RAW_LISTENER__(...args);
    };
    wrapper.__RAW_LISTENER__ = listener;

    this.on(name, wrapper);
    return this;
  }

  off(name: EventName, listener: EventListener) {
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

  emit(name: EventName, ...args: any[]) {
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

  getListeners(name: EventName) {
    this.checkEventName(name);
    return (this.listeners[name] || []).map((listener) => {
      return listener.__RAW_LISTENER__ || listener;
    });
  }

  removeAllListeners(name?: EventName) {
    if (name !== undefined) {
      this.checkEventName(name);
      delete this.listeners[name];
    } else {
      this.listeners = Object.create(null);
    }
    return this;
  }

  getListenersCount(name?: EventName): number {
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
}

export default EventEmitter;
