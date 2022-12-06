import isObject from "lodash/isObject";
import mergeWithDefined from "./mergeWithDefined";

interface Options {
  label?: string;
  scope?: string;
  printer?: (error: Error) => void;
  deduplicated?: boolean;
  warnedMessagesMap?: { [message: string]: boolean };
  captureStackTraceConstructor?: Function;
}

interface Warn {
  (
    condition: boolean,
    message: string,
    variables?: { [name: string]: unknown },
    options?: Options
  ): void;
}

interface Warning extends Warn {
  once: Warn;
  deprecated: Warn;
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
    printer: (error: Error) => {
      console.error(error);
    },
    deduplicated: false,
    warnedMessagesMap: {},
  };

  warning = ((condition, message, variables, options) => {
    if (condition) {
      const {
        label,
        scope,
        printer,
        deduplicated,
        warnedMessagesMap,
        captureStackTraceConstructor,
      } = mergeWithDefined(defaultOptions, options || {});

      if (isObject(variables)) {
        for (const name in variables) {
          if (Object.prototype.hasOwnProperty.call(variables, name)) {
            message = message.replace(`{${name}}`, String(variables[name]));
          }
        }
      }

      class WarningError extends Error {
        constructor(message?: string) {
          super(message);
          this.name = label + (scope ? `(${scope})` : "");
          if (Error.captureStackTrace) {
            Error.captureStackTrace(
              this,
              captureStackTraceConstructor || warning
            );
          }
        }
      }

      const print = () => {
        try {
          throw new WarningError(message);
        } catch (error: unknown) {
          printer(error as Error);
        }
      };

      if (deduplicated) {
        let id = `${label}${scope ? `(${scope})` : ""}: ${message}`;
        if (!warnedMessagesMap[id]) {
          print();
          warnedMessagesMap[id] = true;
        }
      } else {
        print();
      }
    }
  }) as Warning;

  warning.once = (condition, message, variables, options) => {
    warning(
      condition,
      message,
      variables,
      mergeWithDefined(
        {
          deduplicated: true,
          captureStackTraceConstructor: warning.once,
        },
        options || {}
      )
    );
  };

  warning.deprecated = (condition, message, variables, options) => {
    warning(
      condition,
      message,
      variables,
      mergeWithDefined(
        {
          label: "Deprecated",
          deduplicated: true,
          captureStackTraceConstructor: warning.deprecated,
        },
        options || {}
      )
    );
  };
}

export default warning;