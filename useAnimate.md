# useAnimate

Run JavaScript animations with this hook.

## API

```ts
function useAnimate(
  callback: (percent: number) => void,
  options: number | { duration: number; algorithm?: (percent: number) => number },
): [start: () => void, cancel: () => void];
```

Parameters:

- **`callback`:** The animation step function. It receives a percent number between 0 and 1 as the first param.
- **`options`:** The animation duration (milliseconds), or an options object.
  - **`options.duration`:** The duration in milliseconds. Required in the options-object form; ignored when a number is passed directly.
  - **`options.algorithm`:** Optional easing function. The animation runs linearly by default, use this option to override the default behavior.

Results:

- **`start`:** Starts the animation.
- **`cancel`:** Cancels the animation.

## Notes

- The `duration` option must be a positive number; a warning is emitted otherwise.
- `start` cancels a running animation and restarts it from the beginning.
- `algorithm` receives the linear percent and should map it back to the `[0, 1]` range.

## Example

The following example animates a progress bar with a TweenJS easing function.

```tsx
import { useRef } from "react";
import TweenJS from "@tweenjs/tween.js";
import { useAnimate } from "@lilib/hooks";

function Example() {
  const domRef = useRef<HTMLDivElement>(null);
  const [start, cancel] = useAnimate(
    (percent) => {
      if (domRef.current) {
        domRef.current.style.width = percent * 100 + "%";
      }
    },
    {
      duration: 1000,
      algorithm: TweenJS.Easing.Bounce.Out,
    },
  );

  return (
    <>
      <div>
        <button onClick={start}>Start</button> <button onClick={cancel}>Cancel</button>
      </div>
      <div
        ref={domRef}
        style={{ width: 0, height: 8, marginTop: 8, backgroundColor: "orange" }}
      ></div>
    </>
  );
}

export default Example;
```
