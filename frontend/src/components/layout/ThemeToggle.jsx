import { Moon, Sun } from "lucide-react";
import useUIStore from "../../store/uiStore.js";

function ThemeToggle({ className = "" }) {
  const toggleTheme = useUIStore((s) => s.toggleTheme);
  const theme = useUIStore((s) => s.theme);

  const isLight =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("light");

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className={`focus-ring flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 ${className}`}
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-color)",
        color: "var(--text-secondary)",
      }}
      key={theme}
    >
      {isLight ? <Moon size={17} /> : <Sun size={17} />}
    </button>
  );
}

export default ThemeToggle;
