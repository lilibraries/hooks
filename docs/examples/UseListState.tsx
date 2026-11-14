import { useState } from "react";

import { useListState } from "@lilib/hooks";

function Example() {
  const [draft, setDraft] = useState("");
  const [tasks, { push, removeAt, move, clear }] = useListState(["Write docs", "Review tests"]);

  const addTask = () => {
    const task = draft.trim();
    if (task) {
      push(task);
      setDraft("");
    }
  };

  return (
    <>
      <div>
        <input
          value={draft}
          placeholder="New task"
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              addTask();
            }
          }}
        />{" "}
        <button onClick={addTask}>Add</button> <button onClick={clear}>Clear all</button>
      </div>
      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}{" "}
            <button disabled={index === 0} onClick={() => move(index, index - 1)}>
              Up
            </button>{" "}
            <button disabled={index === tasks.length - 1} onClick={() => move(index, index + 1)}>
              Down
            </button>{" "}
            <button onClick={() => removeAt(index)}>Remove</button>
          </li>
        ))}
      </ol>
    </>
  );
}

export default Example;
