# useTitle

Set the document title.

## API

```ts
function useTitle(title: string | null, options?: { restore?: boolean }): void;
```

Parameters:

- **`title`:** The document title. Pass `null` to not set one.
- **`options`:** Options object.
  - **`options.restore`:** Whether to restore the previous title on unmount.

## Notes

- With `restore`, the original title is captured on the hook's first render; when several components restore, the last one to unmount wins.

## Example

The following example syncs the browser tab title with the input.

```tsx
import { useState } from "react";
import { useTitle } from "@lilib/hooks";

function Example() {
  const [title, setTitle] = useState("");
  useTitle(title, { restore: true });

  return (
    <input
      placeholder="Enter title"
      value={title}
      onChange={(event) => {
        setTitle(event.target.value);
      }}
    />
  );
}

export default Example;
```
