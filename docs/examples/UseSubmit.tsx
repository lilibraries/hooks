import { useLoad, useSubmit } from "@lilib/hooks";

const fetchNumber = () => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(Math.random());
    }, 1000);
  });
};

const submitNumber = () => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(Math.random());
    }, 1000);
  });
};

function Example() {
  const { data, loading, update, reload } = useLoad(fetchNumber);

  const { submit, submitting, error } = useSubmit(submitNumber, {
    onSuccess: (result) => {
      update(result);
      reload();
    },
  });

  return (
    <div>
      <button onClick={() => submit()}>{submitting ? "Submitting" : "Submit"}</button>
      {error && <div>Error: {error.message}</div>}
      Number: {data} {loading ? "(Loading...)" : ""}
    </div>
  );
}

export default Example;
