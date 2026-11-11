import isDevelopment from "./isDevelopment";

// One entry per distinct message: a constant message adds one entry per misuse site, a
// message with `%s` adds one per distinct value.
const warned = new Set<string>();

function formatMessage(format: string, args: unknown[]) {
  let argIndex = 0;

  return format.replace(/%s/g, () => String(args[argIndex++]));
}

/**
 * Report a warning during development, at most once per distinct message.
 *
 * Deduplicating by the formatted message keeps a warning raised while rendering from
 * being printed on every render of every component making the same mistake. Nothing is
 * reported in production, where the whole call is removed by the bundler.
 *
 * @param condition The condition that must hold; the warning is reported only when it is falsy.
 * @param format The message, with `%s` placeholders replaced by the following arguments.
 * @param args The values for the `%s` placeholders.
 * @returns Returns nothing.
 */
export default function warn(condition: boolean, format: string, ...args: unknown[]) {
  if (!isDevelopment || condition) {
    return;
  }

  const message = formatMessage(format, args);

  if (warned.has(message)) {
    return;
  }

  warned.add(message);

  if (typeof console !== "undefined") {
    console.error(message);
  }
}
