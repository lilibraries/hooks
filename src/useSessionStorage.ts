import createStorageHook from "./factories/createStorageHook";
import inBrowser from "./utils/inBrowser";

/**
 * Read, write, and remove `sessionStorage` values.
 *
 * @param key The storage key.
 * @param options The options object.
 * @param options.defaultValue The default value.
 * @param options.polling Whether to poll for storage changes.
 * @param options.pollingInterval The polling interval (milliseconds).
 * @param options.compare A function to determine whether the new and old values are equal, defaults to deep comparison.
 * @param options.validate A validation function.
 * @param options.serialize The serialization function, defaults to `JSON.stringify`.
 * @param options.deserialize The deserialization function, defaults to `JSON.parse`.
 * @returns Returns a `[value, setStorage]` tuple.
 */
const useSessionStorage = createStorageHook(() => {
  try {
    return inBrowser ? window.sessionStorage : null;
  } catch {
    // Accessing sessionStorage in private-browsing or restricted environments throws a SecurityError; fall back to no storage
    return null;
  }
});

export default useSessionStorage;
