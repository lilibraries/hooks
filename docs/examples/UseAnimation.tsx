import React, { useRef } from "react";
import TweenJS from "@tweenjs/tween.js";
import { useAnimation } from "@lilib/hooks";

function Example() {
  const domRef = useRef<HTMLDivElement>(null);
  const [start, cancel] = useAnimation(
    (percent) => {
      if (domRef.current) {
        domRef.current.style.width = percent * 100 + "%";
      }
    },
    {
      duration: 1000,
      algorithm: TweenJS.Easing.Bounce.Out,
    }
  );

  return (
    <>
      <div>
        <button onClick={start}>Start</button>{" "}
        <button onClick={cancel}>Cancel</button>
      </div>
      <div
        ref={domRef}
        style={{ width: 0, height: 8, marginTop: 8, backgroundColor: "orange" }}
      ></div>
    </>
  );
}

export default Example;
