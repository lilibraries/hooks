# useMatchMedia

Use [`window.matchMedia()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) to determine whether the document matches the media query string.

## API

```ts
function useMatchMedia(query: string, defaultValue?: boolean): boolean;
```

Parameters:

- **`query`:** The media query string.
- **`defaultValue`:** The default return value in non-browser environments. Default is `false`.

Results:

- Returns `true` if the document matches the query, otherwise `false`.

## Notes

- `defaultValue` only applies in non-browser environments; on the client the result comes from `window.matchMedia`. Mind hydration mismatches when the default differs from the client result.
- Prefer CSS media queries for style-only changes; use this hook when JavaScript logic depends on the match.

## Example

The following example switches the layout when the viewport is narrower than 600px.

```tsx
import { useMatchMedia } from "@lilib/hooks";

function Example() {
  const isNarrow = useMatchMedia("(max-width: 600px)");

  return (
    <div style={{ display: "flex", flexDirection: isNarrow ? "column" : "row", gap: 8 }}>
      <div style={{ flex: 1, padding: 16, backgroundColor: "rgba(255, 165, 0, 0.4)" }}>Sidebar</div>
      <div style={{ flex: 2, padding: 16, backgroundColor: "rgba(0, 128, 255, 0.4)" }}>Content</div>
    </div>
  );
}

export default Example;
```
