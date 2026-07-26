import { useEffect } from "react";
import useUIStore from "../../store/uiStore.js";

function ThemeInit() {
  const initTheme = useUIStore((s) => s.initTheme);

  useEffect(() => {
    initTheme();

    const media = window.matchMedia("(prefers-color-scheme: light)");
    const handleChange = () => {
      const { theme } = useUIStore.getState();
      if (theme === "system") {
        useUIStore.getState().setTheme("system");
      }
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [initTheme]);

  return null;
}

export default ThemeInit;
