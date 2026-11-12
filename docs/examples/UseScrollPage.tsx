import { useScroll } from "@lilib/hooks";

function Example() {
  const { progressY, directionY } = useScroll();

  return (
    <>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          height: 8,
          backgroundColor: "rgba(128, 128, 128, 0.2)",
        }}
      >
        <div
          style={{
            width: `${progressY * 100}%`,
            height: "100%",
            backgroundColor: "orange",
          }}
        />
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to top</button>
        <span>
          Progress: {Math.round(progressY * 100)}%; direction: {directionY || "none"}
        </span>
      </div>
      <p>Scroll the page to see the progress bar and direction update.</p>
    </>
  );
}

export default Example;
