import isObject from "lodash/isObject";
import mergeWithDefined from "./mergeWithDefined";

export interface WarningOptions {
  label?: string;
  scope?: string;
  printer?: (message: string) => void;
  variables?: { [name: string]: unknown };
  deduplicated?: boolean;
  warnedMessages?: { [message: string]: boolean };
}

interface WarningFunction {
  (condition: boolean, message: string, options?: WarningOptions): void;
}

interface Warning extends WarningFunction {
  once: WarningFunction;
  deprecated: WarningFunction;
}

let warning: Warning;

if (process.env.NODE_ENV === "production") {
  const noop = () => {};
  noop.once = () => {};
  noop.deprecated = () => {};
  warning = noop;
} else {
  const defaultOptions = {
    label: "Warning",
    printer: (message: string) => {
      console.error(message);
    },
    deduplicated: false,
    warnedMessages: {},
  };

  warning = ((condition, message, options) => {
    if (condition) {
      const { label, scope, printer, variables, deduplicated, warnedMessages } =
        mergeWithDefined(defaultOptions, options || {});

      if (isObject(variables)) {
        for (const name in variables) {
          if (Object.prototype.hasOwnProperty.call(variables, name)) {
            message = message.replace(`{${name}}`, String(variables[name]));
          }
        }
      }
      message = `${label}${scope ? `(${scope})` : ""}: ${message}`;

      const print = () => {
        printer(message);
        try {
          throw new Error(message);
        } catch (e) {}
      };

      if (deduplicated) {
        if (!warnedMessages[message]) {
          print();
          warnedMessages[message] = true;
        }
      } else {
        print();
      }
    }
  }) as Warning;

  warning.once = (condition, message, options) => {
    warning(
      condition,
      message,
      mergeWithDefined({ deduplicated: true }, options || {})
    );
  };

  warning.deprecated = (condition, message, options) => {
    warning(
      condition,
      message,
      mergeWithDefined(
        {
          label: "Deprecated",
          deduplicated: true,
        },
        options || {}
      )
    );
  };
}

export default warning;
