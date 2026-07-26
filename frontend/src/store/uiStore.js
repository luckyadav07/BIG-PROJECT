import { create } from "zustand";

const THEME_KEY = "jobreach-theme";
const SIDEBAR_KEY = "jobreach-sidebar-collapsed";

function applyTheme(theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");

  if (theme === "light" || theme === "dark") {
    root.classList.add(theme);
    return;
  }

  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  root.classList.add(prefersLight ? "light" : "dark");
}

function resolveTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }
  return "system";
}

const useUIStore = create((set, get) => ({
  toasts: [],
  theme: "system",
  sidebarCollapsed: false,

  initTheme: () => {
    const theme = resolveTheme();
    applyTheme(theme);

    const collapsed = localStorage.getItem(SIDEBAR_KEY) === "true";
    set({ theme, sidebarCollapsed: collapsed });
  },

  setTheme: (theme) => {
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
    set({ theme });
  },

  toggleTheme: () => {
    const root = document.documentElement;
    const isLight = root.classList.contains("light");
    get().setTheme(isLight ? "dark" : "light");
  },

  toggleSidebar: () => {
    const next = !get().sidebarCollapsed;
    localStorage.setItem(SIDEBAR_KEY, String(next));
    set({ sidebarCollapsed: next });
  },

  setSidebarCollapsed: (collapsed) => {
    localStorage.setItem(SIDEBAR_KEY, String(collapsed));
    set({ sidebarCollapsed: collapsed });
  },

  showToast: ({ message, type = "success", duration = 3000 }) => {
    if (!message) return;

    const exists = get().toasts.some(
      (toast) => toast.message === message && toast.type === type
    );

    if (exists) return;

    const id = Date.now();

    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));

    setTimeout(() => {
      get().removeToast(id);
    }, duration);
  },

  success: (message, duration = 3000) =>
    get().showToast({ message, type: "success", duration }),

  error: (message, duration = 4000) =>
    get().showToast({ message, type: "error", duration }),

  warning: (message, duration = 3500) =>
    get().showToast({ message, type: "warning", duration }),

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),

  clearToasts: () => set({ toasts: [] }),
}));

export default useUIStore;
