# useToggle

Manage a boolean value.

## API

```ts
function useToggle(initialValue?: boolean): [
  value: boolean,
  actions: {
    toggle: (newValue?: boolean) => void;
    toggleOn: () => void;
    toggleOff: () => void;
  },
];
```

Parameters:

- **`initialValue`:** Optional initial value. Default is `false`.

Results:

- **`value`:** A boolean value that can be changed by the following actions.
- **`actions`:** Actions object.
  - **`actions.toggle`:** Toggle the `value`. If the `newValue` param is not `undefined`, the `value` will be set to `newValue` (cast to boolean).
  - **`actions.toggleOn`:** Set the `value` to `true`.
  - **`actions.toggleOff`:** Set the `value` to `false`.

## Example

The following example controls a details panel with the toggle actions.

```tsx
import { useToggle } from "@lilib/hooks";

function Example() {
  const [on, { toggle, toggleOn, toggleOff }] = useToggle(true);

  return (
    <>
      <div>
        <button onClick={() => toggle()}>Toggle</button> <button onClick={toggleOn}>Turn on</button>{" "}
        <button onClick={toggleOff}>Turn off</button>
      </div>
      <div>The switch is {on ? "on" : "off"}</div>
      {on && (
        <div style={{ padding: 8, marginTop: 8, backgroundColor: "rgba(255, 165, 0, 0.3)" }}>
          Details panel
        </div>
      )}
    </>
  );
}

export default Example;
```
