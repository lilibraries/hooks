# useDelayedValue

Delay updates to a value.

## API

```ts
function useDelayedValue<T>(
  value: T,
  options:
    | number
    | {
        delay: number;
        shouldDelay?: (value: any) => boolean;
        compare?: (x: any, y: any) => boolean;
      },
): T;
```

Parameters:

- **`value`:** The value whose updates will be delayed.
- **`options`:** The delay time (milliseconds) or an options object.
  - **`options.delay`:** Delay time, in milliseconds. It must be a positive number.
  - **`options.shouldDelay`:** A function that determines whether an update should be delayed. Returning `false` updates immediately and synchronously. Any value is delayed by default.
  - **`options.compare`:** A function to determine whether the new and old values are equal, defaults to `Object.is`.

Results:

- Returns the delayed value.

## Notes

- The initial render returns `value` immediately; only subsequent updates are delayed.
- `shouldDelay` returning `false` applies the update immediately and synchronously.
- The default `compare` is `Object.is`: a new object each render triggers an update every time.

## Example

In the following example, showing `"Loading..."` is delayed for 500ms after the value changes to `true`; changes to `false` are applied immediately.

```tsx
import { useDelayedValue, useToggle } from "@lilib/hooks";

function Example() {
  const [loading, { toggle }] = useToggle(false);
  const delayedLoading = useDelayedValue(loading, {
    delay: 500,
    shouldDelay: (value) => value === true,
  });

  return (
    <div>
      <button onClick={() => toggle()}>Toggle</button>
      {delayedLoading && "Loading..."}
    </div>
  );
}

export default Example;
```
