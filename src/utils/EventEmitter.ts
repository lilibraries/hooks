import isString from "./isString";
import isSymbol from "./isSymbol";
import isFunction from "./isFunction";

type EventName = string | symbol;

interface EventListener {
  (...args: any[]): void;
}
interface EventListenerWrapper extends EventListener {
  __LISTENER__?: EventListener;
}

function checkName(name: unknown) {
  if (!isString(name) && !isSymbol(name)) {
    throw new TypeError(
      `Event name must be a string or a symbol. Received: ${typeof name}`
    );
  }
  if (name === "") {
    throw new TypeError("Event name can not be an empty string.");
  }
}

function checkListener(listener: unknown) {
  if (!isFunction(listener)) {
    throw new TypeError(
      `Event listener must be a function. Received: ${typeof listener}`
    );
  }
}

class EventEmitter {
  private readonly events: {
    [name: EventName]: EventListenerWrapper[] | undefined;
  } = Object.create(null);

  on(name: EventName, listener: EventListener) {
    checkName(name);
    checkListener(listener);

    if (this.events[name]) {
      this.events[name]?.push(listener);
    } else {
      this.events[name] = [listener];
    }

    return this;
  }

  once(name: EventName, listener: EventListener) {
    checkName(name);
    checkListener(listener);

    const wrapper: EventListenerWrapper & {
      __LISTENER__: EventListener;
    } = (...args: any[]) => {
      this.off(name, wrapper.__LISTENER__);
      wrapper.__LISTENER__(...args);
    };

    wrapper.__LISTENER__ = listener;
    this.on(name, wrapper);

    return this;
  }

  off(name: EventName, listener: EventListener) {
    checkName(name);
    checkListener(listener);

    const listeners = this.events[name];
    if (listeners) {
      let position = -1;
      for (let i = listeners.length - 1; i >= 0; i--) {
        if (
          listeners[i] === listener ||
          listeners[i].__LISTENER__ === listener
        ) {
          position = i;
          break;
        }
      }
      if (position >= 0) {
        listeners.splice(position, 1);
      }
      if (listeners.length === 0) {
        delete this.events[name];
      }
    }

    return this;
  }

  emit(name: EventName, ...args: any[]) {
    checkName(name);

    let listeners = this.events[name];
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
}

export default EventEmitter;
