# useWindowSize

Get the window size.

## API

```ts
function useWindowSize(): {
  width: number | undefined;
  height: number | undefined;
};
```

Results:

- **`width`:** Window width, or `undefined` outside the browser.
- **`height`:** Window height, or `undefined` outside the browser.

## Notes

- The size comes from `window.innerWidth`/`innerHeight`, which include scrollbars.
- On mobile, collapsing or expanding the address bar changes the viewport without firing a window `resize`; the hook also listens to `visualViewport.resize` for that.

## Example

The following example switches the layout based on the window width; resize the browser window to see the effect.

```tsx
import { useWindowSize } from "@lilib/hooks";

function Example() {
  const { width = 0 } = useWindowSize();

  return (
    <>
      <div>Window width: {width}px</div>
      <div style={{ display: "flex", flexDirection: width < 600 ? "column" : "row", gap: 8 }}>
        <div style={{ flex: 1, padding: 16, backgroundColor: "rgba(255, 165, 0, 0.4)" }}>
          Sidebar
        </div>
        <div style={{ flex: 2, padding: 16, backgroundColor: "rgba(0, 128, 255, 0.4)" }}>
          Content
        </div>
      </div>
    </>
  );
}

export default Example;
```
