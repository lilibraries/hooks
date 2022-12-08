import isString from "lodash/isString";
import isSymbol from "lodash/isSymbol";
import isFunction from "lodash/isFunction";
import warning from "./warning";
import getDisplayName from "./getDisplayName";
import getConstructorName from "./getConstructorName";

type Key = any;
type Name = string | symbol;
type Listener = (...args: any[]) => void;
type ListenerWrapper = Listener & { __RAW_LISTENER__?: Listener };

class EventEmitter {
  static DEFAULT_MAX_LISTENERS = 100;

  _forKey: Key;
  _topEmitter: EventEmitter | null = null;
  _parentEmitter: EventEmitter | null = null;

  _emitters = new Map<Key, EventEmitter>();
  _listeners: {
    [name: PropertyKey]: ListenerWrapper[] | undefined;
  } = Object.create(null);
  _maxListeners = EventEmitter.DEFAULT_MAX_LISTENERS;

  _checkEventName(name: unknown) {
    if (this._topEmitter) {
      this._topEmitter._checkEventName(name);
    } else {
      if (!isString(name) && !isSymbol(name)) {
        throw new TypeError(
          `Event name must be a string or a symbol. Received: ${typeof name}.`
        );
      }
      if (name === "") {
        throw new TypeError("Event name can not be an empty string.");
      }
    }
  }

  _checkEventListener(listener: unknown) {
    if (this._topEmitter) {
      this._topEmitter._checkEventListener(listener);
    } else {
      if (!isFunction(listener)) {
        throw new TypeError(
          `Event listener must be a function. Received: ${typeof listener}.`
        );
      }
    }
  }

  _attach() {
    if (this._parentEmitter) {
      const emitters = this._parentEmitter._emitters;
      if (!emitters.has(this._forKey)) {
        emitters.set(this._forKey, this);
      }
      this._parentEmitter._attach();
    }
  }

  _prune() {
    if (this._parentEmitter) {
      if (!this._emitters.size && !this.getListenersCount()) {
        this._parentEmitter._emitters.delete(this._forKey);
        this._parentEmitter._prune();
      }
    }
  }

  getMaxListeners() {
    if (this._topEmitter) {
      return this._topEmitter._maxListeners;
    } else {
      return this._maxListeners;
    }
  }

  setMaxListeners(count: number) {
    if (this._topEmitter) {
      this._topEmitter.setMaxListeners(count);
    } else {
      this._maxListeners = count;
    }
    return this;
  }

  for(key: Key) {
    let emitter = this._emitters.get(key);
    if (!emitter) {
      emitter = new EventEmitter();
      emitter._forKey = key;
      emitter._topEmitter = this._topEmitter || this;
      emitter._parentEmitter = this;
    }
    return emitter;
  }

  on(name: Name, listener: Listener) {
    this._checkEventName(name);
    this._checkEventListener(listener);

    let listeners = this._listeners[name];
    if (listeners) {
      listeners.push(listener);
    } else {
      listeners = this._listeners[name] = [listener];
    }

    if (process.env.NODE_ENV !== "production") {
      const maxListeners = this.getMaxListeners();
      const forKeys = [];

      let current = this as EventEmitter;
      while (current._parentEmitter) {
        forKeys.unshift(current._forKey);
        current = current._parentEmitter;
      }

      let forMessage = "";
      if (forKeys.length) {
        forMessage = forKeys.map(getDisplayName).join(" > ");
      }
      if (forMessage) {
        forMessage = ` for \`${forMessage}\``;
      }

      warning.once(
        listeners.length > maxListeners,
        "Listened to more than {maxListeners} `{name}` events{forMessage}, which may lead to memory leaks.",
        {
          scope: getConstructorName(this._topEmitter || this),
          variables: { name, maxListeners, forMessage },
        }
      );
    }

    this._attach();
    return this;
  }

  once(name: Name, listener: Listener) {
    this._checkEventName(name);
    this._checkEventListener(listener);

    const wrapper = (...args: any[]) => {
      this.off(name, wrapper.__RAW_LISTENER__);
      wrapper.__RAW_LISTENER__(...args);
    };
    wrapper.__RAW_LISTENER__ = listener;

    this.on(name, wrapper);
    return this;
  }

  off(name: Name, listener: Listener) {
    this._checkEventName(name);
    this._checkEventListener(listener);

    const listeners = this._listeners[name];
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
        delete this._listeners[name];
      }
    }

    this._prune();
    return this;
  }

  emit(name: Name, ...args: any[]) {
    this._checkEventName(name);

    let listeners = this._listeners[name];
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
      ...Object.getOwnPropertyNames(this._listeners),
      ...Object.getOwnPropertySymbols(this._listeners),
    ];
  }

  getListeners(name: Name) {
    this._checkEventName(name);
    return (this._listeners[name] || []).map((listener) => {
      return listener.__RAW_LISTENER__ || listener;
    });
  }

  getListenersCount(name?: Name): number {
    let sum = 0;
    if (name !== undefined) {
      this._checkEventName(name);
      sum = this._listeners[name]?.length || 0;
    } else {
      this.getEventNames().forEach((name) => {
        sum += this._listeners[name]?.length || 0;
      });
    }
    return sum;
  }

  removeAllListeners(name?: Name) {
    if (name !== undefined) {
      this._checkEventName(name);
      delete this._listeners[name];
    } else {
      this._listeners = Object.create(null);
    }
    this._prune();
    return this;
  }
}

export default EventEmitter;
