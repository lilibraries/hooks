# useMount

Run an effect after the component is mounted.

## API

```ts
function useMount(effect: React.EffectCallback): void;
```

Parameters:

- **`effect`:** The effect to run after the component mounts. It may return a cleanup function.

## Notes

- In StrictMode, the effect runs twice: mount → cleanup → mount. Keep the effect idempotent.

## Example

The following example focuses an input when the component mounts.

```tsx
import { useRef } from "react";
import { useMount } from "@lilib/hooks";

function Example() {
  const inputRef = useRef<HTMLInputElement>(null);

  useMount(() => {
    inputRef.current?.focus();
  });

  return <input ref={inputRef} placeholder="Focused on mount" />;
}

export default Example;
```
