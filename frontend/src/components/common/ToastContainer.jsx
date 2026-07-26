import useUIStore from "../../store/uiStore.js";
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const variantStyles = {
  success: {
    accent: "var(--color-success)",
    bg: "rgba(16, 185, 129, 0.1)",
  },
  error: {
    accent: "var(--color-danger)",
    bg: "rgba(239, 68, 68, 0.1)",
  },
  warning: {
    accent: "var(--color-warning)",
    bg: "rgba(245, 158, 11, 0.1)",
  },
  info: {
    accent: "var(--color-info)",
    bg: "rgba(59, 130, 246, 0.1)",
  },
};

function ToastContainer() {
  const toasts = useUIStore((s) => s.toasts);
  const removeToast = useUIStore((s) => s.removeToast);

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
      {toasts.map((toast) => {
        const Icon = icons[toast.type] || CheckCircle;
        const style = variantStyles[toast.type] || variantStyles.success;

        return (
          <div
            key={toast.id}
            onClick={() => removeToast(toast.id)}
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] animate-fade-in min-w-[300px] max-w-[400px]"
            style={{
              background: "var(--bg-card)",
              border: `1px solid ${style.accent}`,
              boxShadow: "var(--shadow-lg)",
            }}
            role="alert"
          >
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              style={{ background: style.bg }}
            >
              <Icon size={18} style={{ color: style.accent }} />
            </div>

            <p
              className="flex-1 text-sm font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              {toast.message}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default ToastContainer;
