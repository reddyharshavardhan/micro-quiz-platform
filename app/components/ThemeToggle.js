"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      className="p-2 rounded bg-gray-200 hover:bg-gray-400 dark:bg-gray-700 dark:text-white"
      onClick={() => setDark(d => !d)}
      title="Toggle theme"
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}