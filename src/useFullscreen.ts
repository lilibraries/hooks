import { useDebugValue, useRef, type RefObject } from "react";

import useEventListener from "./useEventListener";
import useLayoutRefEffect from "./useLayoutRefEffect";
import usePersist from "./usePersist";
import useSafeState from "./useSafeState";
import inBrowser from "./utils/inBrowser";
import unref from "./utils/unref";

interface FullscreenActions {
  /** Enter fullscreen; resolves with whether the browser accepted the request. */
  enter: () => Promise<boolean>;
  /**
   * Exit fullscreen when the target is the fullscreen element; resolves `false` when there is
   * no target, otherwise with whether the target is not fullscreen afterwards.
   */
  exit: () => Promise<boolean>;
  /** Enter or exit depending on the current state; resolves like the action it performed. */
  toggle: () => Promise<boolean>;
}

// Older Safari and Firefox expose the Fullscreen API (and its event) under the
// `webkit` / `moz` prefixes.
interface PrefixedElement extends Element {
  webkitRequestFullscreen?: () => Promise<void> | void;
  mozRequestFullScreen?: () => Promise<void> | void;
}

interface PrefixedDocument extends Document {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
  mozFullScreenElement?: Element | null;
  mozCancelFullScreen?: () => Promise<void> | void;
}

function getFullscreenElement(doc: Document) {
  const prefixedDoc = doc as PrefixedDocument;
  return (
    doc.fullscreenElement ??
    prefixedDoc.webkitFullscreenElement ??
    prefixedDoc.mozFullScreenElement ??
    null
  );
}

function getRequestFullscreen(element: Element) {
  const prefixedElement = element as PrefixedElement;
  const request =
    element.requestFullscreen ||
    prefixedElement.webkitRequestFullscreen ||
    prefixedElement.mozRequestFullScreen;

  if (request) {
    return () => request.call(element);
  }
}

function getExitFullscreen(doc: Document) {
  const prefixedDoc = doc as PrefixedDocument;
  const request =
    doc.exitFullscreen || prefixedDoc.webkitExitFullscreen || prefixedDoc.mozCancelFullScreen;

  if (request) {
    return () => request.call(doc);
  }
}

// A rejected request resolves `false` instead of rejecting; prefixed implementations return
// nothing, so an accepted call resolves `true`.
function runRequest(request: () => Promise<void> | void): Promise<boolean> {
  try {
    return Promise.resolve(request()).then(
      () => true,
      () => false,
    );
  } catch {
    return Promise.resolve(false);
  }
}

/**
 * Enter, exit and track the fullscreen state of the page or an element.
 *
 * @param target The element (or its ref) to track and control; defaults to the document's
 * root element (the whole page); pass `null` to track nothing. A ref is read when an action
 * runs, so an element assigned after the first render is handled on the next call.
 * @returns Returns a `[fullscreen, actions]` tuple: `fullscreen` indicates whether the target
 * element is currently the fullscreen element; `actions` keeps a stable identity and contains
 * `enter`, `exit` and `toggle`.
 */
function useFullscreen(target?: Element | RefObject<Element | null> | null) {
  const [fullscreen, setFullscreen] = useSafeState(false);

  const elementRef = useRef<Element | null>(null);
  const documentRef = useRef<Document | null>(null);

  const update = usePersist(() => {
    const doc = documentRef.current;
    setFullscreen(
      !!elementRef.current && !!doc && getFullscreenElement(doc) === elementRef.current,
    );
  });

  const getTarget = usePersist((): Element | null => {
    if (!inBrowser || target === null) {
      return null;
    }
    return target === undefined ? document.documentElement : unref(target);
  });

  // The target may belong to another document, e.g. an element inside an iframe.
  useLayoutRefEffect(() => {
    const element = getTarget();

    elementRef.current = element;
    documentRef.current = element ? element.ownerDocument : null;
    update();

    return () => {
      elementRef.current = null;
      documentRef.current = null;
    };
  }, [target, getTarget, update]);

  useEventListener(documentRef, "fullscreenchange", update);
  // Only the prefixed event fires when the prefixed API is in use.
  useEventListener(documentRef, "webkitfullscreenchange", update);
  useEventListener(documentRef, "mozfullscreenchange", update);

  const enter = usePersist(() => {
    const element = getTarget();
    const request = element ? getRequestFullscreen(element) : undefined;

    return request ? runRequest(request) : Promise.resolve(false);
  });

  const exit = usePersist(() => {
    const element = getTarget();
    if (!element) {
      return Promise.resolve(false);
    }

    const doc = element.ownerDocument;
    if (getFullscreenElement(doc) !== element) {
      // Another element owns the session: exiting would close it instead.
      return Promise.resolve(true);
    }

    const request = getExitFullscreen(doc);
    return request ? runRequest(request) : Promise.resolve(false);
  });

  const toggle = usePersist(() => {
    const element = getTarget();
    if (!element) {
      return Promise.resolve(false);
    }
    return getFullscreenElement(element.ownerDocument) === element ? exit() : enter();
  });

  const actionsRef = useRef<FullscreenActions | undefined>(undefined);

  if (!actionsRef.current) {
    actionsRef.current = { enter, exit, toggle };
  }

  useDebugValue(fullscreen);

  return [fullscreen, actionsRef.current] as const;
}

export default useFullscreen;
