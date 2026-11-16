import { useState } from "react";
import { useCountdown } from "@lilib/hooks";

function Example() {
  const [sent, setSent] = useState(false);
  const [remainingTime, { start }] = useCountdown({
    duration: 60 * 1000,
    autoStart: false,
    onEnd: () => setSent(false),
  });

  const send = () => {
    setSent(true);
    start();
  };

  return (
    <button onClick={send} disabled={sent}>
      {sent ? `Resend in ${Math.ceil(remainingTime / 1000)}s` : "Send code"}
    </button>
  );
}

export default Example;
