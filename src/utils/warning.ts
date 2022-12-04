import isObject from "lodash/isObject";

interface Warning {
  (
    condition: boolean,
    message: string,
    variables?: { [name: string]: unknown },
    options?: { label?: string; deduplicated?: boolean }
  ): void;
}

const defaultOptions = {
  label: "Warning: ",
  deduplicated: false,
};

let warning: Warning;
if (process.env.NODE_ENV === "production") {
  warning = () => {};
} else {
  const warned: { [message: string]: boolean } = {};

  warning = (condition, message, variables, options) => {
    if (condition) {
      const { label, deduplicated } = { ...defaultOptions, ...options };

      if (isObject(variables)) {
        for (const name in variables) {
          if (Object.prototype.hasOwnProperty.call(variables, name)) {
            message = message.replace(`{${name}}`, String(variables[name]));
          }
        }
      }
      message = label + message;

      const print = () => {
        console.error(message);
        try {
          throw new Error(message);
        } catch (e) {}
      };

      if (deduplicated) {
        if (!warned[message]) {
          print();
          warned[message] = true;
        }
      } else {
        print();
      }
    }
  };
}

export default warning;
