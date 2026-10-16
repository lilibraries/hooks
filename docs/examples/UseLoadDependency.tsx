import { useState } from "react";
import { useLoad } from "@lilib/hooks";

const fetchUser = (userId: number) => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`User ${userId}`);
    }, 1000);
  });
};

function UserCard({ userId }: { userId: number }) {
  const { data, loading } = useLoad(() => fetchUser(userId), [userId]);

  return <div>User: {loading ? "Loading..." : data}</div>;
}

function Example() {
  const [userId, setUserId] = useState(1);

  return (
    <div>
      <button onClick={() => setUserId((userId) => (userId % 3) + 1)}>Switch user</button>
      <UserCard userId={userId} />
    </div>
  );
}

export default Example;
