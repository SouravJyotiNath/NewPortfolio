import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      className="p-2 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xl transition"
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle dark mode"
      style={{ position: "fixed", top: 24, right: 24, zIndex: 50 }}
    >
      {dark ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;