import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

(function initThemeEarly() {
  const stored = localStorage.getItem("jobreach-theme");
  const root = document.documentElement;
  root.classList.remove("light", "dark");

  if (stored === "light" || stored === "dark") {
    root.classList.add(stored);
  } else {
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    root.classList.add(prefersLight ? "light" : "dark");
  }
})();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
