# useOnline

Detect whether the network is online. In a non-browser environment, it always returns `true`.

## API

```ts
function useOnline(): boolean;
```

Results:

- Returns `true` if the network is online, otherwise `false`.

## Notes

- `navigator.onLine` only reports whether the device is connected to a network (e.g. a router); it does not guarantee internet access.

## Example

The following example shows a banner when the network goes offline.

```tsx
import { useOnline } from "@lilib/hooks";

function Example() {
  const online = useOnline();

  return (
    <div style={{ padding: 8, backgroundColor: online ? "#d4edda" : "#f8d7da" }}>
      {online ? "The network is online" : "You are offline"}
    </div>
  );
}

export default Example;
```
