import { useDarkMode } from "@lilib/hooks";

function Example() {
  const isDarkMode = useDarkMode();

  return (
    <div
      style={{
        padding: 16,
        border: "1px solid rgba(128, 128, 128, 0.25)",
        color: isDarkMode ? "#ffffff" : "#000000",
        backgroundColor: isDarkMode ? "#1b1b1d" : "#f5f6f7",
      }}
    >
      {isDarkMode ? "Dark theme" : "Light theme"} (prefers-color-scheme:{" "}
      {isDarkMode ? "dark" : "light"})
    </div>
  );
}

export default Example;
