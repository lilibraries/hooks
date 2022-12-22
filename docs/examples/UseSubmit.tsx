import React from "react";
import { useLoad, useSubmit } from "@lilib/hooks";

const getNumber = () => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(Math.random());
    }, 1000);
  });
};

function Example() {
  const { data, loading, update, reload } = useLoad(getNumber);

  const { submit, submitting } = useSubmit(getNumber, {
    onSuccess: (result) => {
      update(result);
      reload();
    },
  });

  return (
    <div>
      <button onClick={() => submit()}>
        {submitting ? "Submitting" : "Submit"}
      </button>
      Number: {data} {loading ? "(Loading...)" : ""}
    </div>
  );
}

export default Example;
