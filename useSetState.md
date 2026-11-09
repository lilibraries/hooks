# useSetState

This hook is like the `this.setState` method of class components. It requires an object as the initial state, and can update part of the state. The new state will be merged with the old state.

## API

```ts
function useSetState<S extends object>(
  initialState: S | (() => S),
): [state: S, setState: (patch: Partial<S> | ((prevState: S) => Partial<S>)) => void];
```

Parameters:

- **`initialState`:** The initial state object, or a function that returns it.

Results:

- **`state`:** The current state object.
- **`setState`:** Update part of the state; the patch will be merged with the old state. The `patch` can be an object or a function computed from the previous state.

## Notes

- Merging is shallow: patching a nested object replaces the whole nested value. Use the functional form with a manual spread to merge deeply.

## Example

The following example manages a form's fields in one state object, updating one field at a time.

```tsx
import { useSetState } from "@lilib/hooks";

function Example() {
  const [state, setState] = useSetState({ firstName: "", lastName: "" });

  return (
    <>
      <p>
        First name:{" "}
        <input
          value={state.firstName}
          onChange={(event) => {
            setState({ firstName: event.target.value });
          }}
        />
      </p>
      <p>
        Last name:{" "}
        <input
          value={state.lastName}
          onChange={(event) => {
            setState({ lastName: event.target.value });
          }}
        />
      </p>
      <div>
        Full name: {state.firstName} {state.lastName}
      </div>
    </>
  );
}

export default Example;
```
