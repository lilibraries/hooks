// Check whether an object can receive event listeners (has both
// `addEventListener` and `removeEventListener`)
function isEventTarget(target: any): target is EventTarget {
  return !!target && !!target.addEventListener && !!target.removeEventListener;
}

export default isEventTarget;
