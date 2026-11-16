# useCountdown

Count down to a deadline. The hook returns the remaining time in milliseconds and leaves the formatting to you.

## API

```ts
function useCountdown(options?: {
  deadline?: number;
  duration?: number;
  interval?: number;
  autoStart?: boolean;
  onEnd?: () => void;
}): [
  remainingTime: number,
  actions: {
    start: (options?: { deadline?: number; duration?: number }) => void;
    pause: () => void;
    resume: () => void;
  },
];
```

Parameters:

- **`deadline`:** The absolute deadline as a timestamp (epoch milliseconds); takes precedence over `duration`.
- **`duration`:** The duration in milliseconds, converted to a deadline when the countdown starts.
- **`interval`:** The interval in milliseconds between two state updates, defaults to `1000`.
- **`autoStart`:** Whether to start counting down on mount, defaults to `true`.
- **`onEnd`:** Called once when the deadline of a countdown target is reached.

Results:

- **`remainingTime`:** The remaining time in milliseconds, never negative.
- **`actions`:** Actions object with a stable identity.
  - **`actions.start`:** Start or restart the countdown, counting down to the given `deadline` or `duration`, falling back to the hook options. It clears any previous countdown first.
  - **`actions.pause`:** Freeze `remainingTime` until `resume` is called. Pausing a finished countdown does nothing.
  - **`actions.resume`:** Continue counting down from the frozen `remainingTime`. Does nothing unless paused.

## Notes

- The countdown is driven by the deadline rather than by decrementing a counter, so a throttled background tab never falls behind; it re-synchronizes as soon as the page becomes visible or focused again.
- Changing the options alone does not restart the countdown.
- `onEnd` fires once per countdown target, identified by the resolved deadline, so restarting with the same `deadline` does not fire it again while restarting with `duration` does; a target that has already passed fires it once as the countdown starts.
- `remainingTime` is seeded from `duration`, or from `0` when only `deadline` is given, and ends at `0`; with `deadline` alone the server-rendered value is `0`, so render the number after mount.
- Each instance runs one timer and tracks one target: rows that share the same deadline can share a single instance, while rows with independent deadlines each need their own.
- Whether the countdown is paused is not part of the returned value, so record it yourself when the UI needs it. `remainingTime` on its own reads like this:

  | `remainingTime`            | Meaning                                                  |
  | -------------------------- | -------------------------------------------------------- |
  | `duration`, unchanged      | Not started yet (`autoStart: false`, no `start()` call)  |
  | `> 0`, decreasing per tick | Running                                                  |
  | `> 0`, frozen              | Paused                                                   |
  | `0`                        | Finished, or never started when only `deadline` is given |

## Example

The example is a one-time-password resend timer: `autoStart: false` keeps it idle until the code is sent, and `onEnd` restores the button when the countdown reaches zero.

```tsx
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
```
