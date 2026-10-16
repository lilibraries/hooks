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
