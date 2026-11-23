import useEventListener from "./useEventListener";
import inBrowser from "./utils/inBrowser";

interface UseBeforeUnloadOptions {
  /** Whether the guard is active. Defaults to `true`. */
  enabled?: boolean;
}

/**
 * Prompt the user before leaving the page, typically to guard unsaved changes.
 *
 * @param options The options object.
 * @param options.enabled Whether the guard is active. Defaults to `true`.
 */
function useBeforeUnload(options?: UseBeforeUnloadOptions) {
  const { enabled = true } = options || {};

  const windowRef = {
    get current() {
      return inBrowser && enabled ? window : null;
    },
  };

  useEventListener<Window, BeforeUnloadEvent>(windowRef, "beforeunload", (event) => {
    if (!enabled) {
      return;
    }

    event.preventDefault();
    // Legacy browsers (e.g. Chrome/Edge < 119) only show the dialog for a truthy `returnValue`.
    event.returnValue = true;
  });
}

export default useBeforeUnload;
