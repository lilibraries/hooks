# useDarkMode

Detect whether the preferred color scheme of the system is dark.

## API

```ts
function useDarkMode(): boolean;
```

Results:

- Returns `true` if the system prefers dark mode, otherwise `false`.

## Notes

- This hook is read-only: it reflects the system preference and cannot be toggled programmatically. To implement a user-overridable theme, manage the state yourself (e.g. with `useLocalStorage`).
- Returns `false` in non-browser environments and in browsers without `prefers-color-scheme` support.

## Example

The following example switches a card between light and dark themes based on the system preference.

```tsx
import { useDarkMode } from "@lilib/hooks";

function Example() {
  const isDarkMode = useDarkMode();

  return (
    <div
      style={{
        padding: 16,
        border: "1px solid rgba(128, 128, 128, 0.25)",
        color: isDarkMode ? "#ffffff" : "#000000",
        backgroundColor: isDarkMode ? "#1b1b1d" : "#f5f6f7",
      }}
    >
      {isDarkMode ? "Dark theme" : "Light theme"} (prefers-color-scheme:{" "}
      {isDarkMode ? "dark" : "light"})
    </div>
  );
}

export default Example;
```
