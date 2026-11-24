# useBeforeUnload

Prompt the user before leaving the page, typically to guard unsaved changes.

## API

```ts
function useBeforeUnload(options?: { enabled?: boolean }): void;
```

Parameters:

- **`options`:** Options object.
  - **`options.enabled`:** Whether the guard is active. Defaults to `true`.

## Example

Type something, then reload the page or close the tab.

```tsx
import { useState } from "react";
import { useBeforeUnload } from "@lilib/hooks";

function Example() {
  const [draft, setDraft] = useState("");

  useBeforeUnload({ enabled: draft !== "" });

  return <input value={draft} onChange={(event) => setDraft(event.target.value)} />;
}

export default Example;
```
