# useReload

This hook returns a function to reload all requests that share the same `key` in [`useLoad`](useLoad.md). It is the companion of `useLoad`'s [`key` option](useLoad.md#api): set the same `key` in multiple `useLoad` instances, and call the returned function from anywhere to refresh them all at once.

Typical use case: after a create/update/delete operation succeeds, all components showing data of the same origin must be refreshed — the [`useSubmit`](useSubmit.md) example demonstrates such a workflow.

## How it works

- Every mounted `useLoad` instance with a `key` registers its own `reload` in a shared store.
- The function returned by `useReload(key)` calls `reload` on every registered instance with that key. Each instance reloads with its own most recent params (or `defaultParams`).
- The returned function also accepts an options object; the `force` passed on call overrides the hook-level one. With `force: true`, the reload bypasses the `staleTime` cache hit of the associated instances.

## API

```ts
interface UseReloadOptions {
  force?: boolean;
}

function useReload(
  key: NonNullable<unknown>,
  options?: UseReloadOptions,
): (options?: UseReloadOptions) => void;
```

Parameters:

- **`key`:** The key set in `useLoad`, matching the instances to reload. It can be any value except `null` and `undefined`, and must be immutable.
- **`options`:** Options object.
  - **`options.force`:** Whether to reload forcibly, bypassing the `staleTime` cache hit of the associated [`useLoad`](useLoad.md) instances.

Results:

- A function to reload all of the associated requests. It also accepts an options object; the `force` passed on call overrides the hook-level one.

## Notes

- Only mounted instances are reloaded: instances that have unmounted are removed from the shared store.
- Object keys are matched by reference — pass the same object (or a primitive value) as in `useLoad`.

## Example

_One click reloads both components. `independent: true` keeps their requests separate so each shows its own data._

```tsx
import { useLoad, useReload } from "@lilib/hooks";

const fetchUserCount = () => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 1000));
    }, 1000);
  });
};

const fetchUserId = () => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`user-${Math.floor(Math.random() * 100)}`);
    }, 1000);
  });
};

// The same `key` links both instances for group reload; `independent: true` keeps their requests separate.
function UserCount() {
  const { data, loading } = useLoad(fetchUserCount, [], {
    key: "user-data",
    independent: true,
  });

  return <div>Users: {loading ? "Loading..." : data}</div>;
}

function UserId() {
  const { data, loading } = useLoad(fetchUserId, [], {
    key: "user-data",
    independent: true,
  });

  return <div>User ID: {loading ? "Loading..." : data}</div>;
}

function Example() {
  const reload = useReload("user-data");

  return (
    <div>
      <UserCount />
      <UserId />
      <button onClick={() => reload()}>Reload</button>
    </div>
  );
}

export default Example;
```
