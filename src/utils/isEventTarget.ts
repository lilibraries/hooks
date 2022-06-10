function isEventTarget(target: any): target is EventTarget {
  return !!target && !!target.addEventListener && !!target.removeEventListener;
}

export default isEventTarget;
