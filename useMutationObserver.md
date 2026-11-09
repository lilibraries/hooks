# useMutationObserver

Observe changes to a DOM node, such as inserted or removed child nodes and changed attributes.

## API

```ts
function useMutationObserver(
  target: Node | React.RefObject<Node | null>,
  listener: (records: MutationRecord[]) => void,
  options?: MutationObserverInit,
): void;
```

Parameters:

- **`target`:** A DOM node to observe, or a ref object that references it.
- **`listener`:** Listener function invoked with the mutation records.
- **`options`:** See [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe) options. Omitted, it defaults to `{ childList: true, attributes: true, characterData: true }`; when provided, it replaces the defaults instead of merging with them.

## Notes

- When `options` is provided, it replaces the defaults instead of merging with them, so at least one of `childList`, `attributes` and `characterData` must end up enabled, otherwise `observe` throws a `TypeError`.
- `attributeFilter` is compared by content, so inline arrays do not recreate the observer on every render.

## Example

The following example reports the type of the latest mutation of a text node.

```tsx
import { useRef, useState } from "react";
import { useMutationObserver } from "@lilib/hooks";

function Example() {
  const [content, setContent] = useState("Hello");
  const [lastMutation, setLastMutation] = useState("None");
  const containerRef = useRef<HTMLDivElement>(null);

  useMutationObserver(
    containerRef,
    (records) => {
      const record = records[0];
      setLastMutation(record ? record.type : "None");
    },
    { childList: true, characterData: true, subtree: true },
  );

  return (
    <>
      <div>
        <button onClick={() => setContent((content) => (content === "Hello" ? "World" : "Hello"))}>
          Change text
        </button>
      </div>
      <div
        ref={containerRef}
        style={{
          padding: 16,
          backgroundColor: "rgba(255, 165, 0, 0.3)",
        }}
      >
        {content}
      </div>
      <div>Last mutation: {lastMutation}</div>
    </>
  );
}

export default Example;
```
