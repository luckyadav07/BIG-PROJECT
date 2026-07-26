const variants = {
  info: {
    bg: "rgba(59, 130, 246, 0.1)",
    border: "rgba(59, 130, 246, 0.25)",
    color: "var(--color-info)",
  },
  success: {
    bg: "rgba(16, 185, 129, 0.1)",
    border: "rgba(16, 185, 129, 0.25)",
    color: "var(--color-success)",
  },
  warning: {
    bg: "rgba(245, 158, 11, 0.1)",
    border: "rgba(245, 158, 11, 0.25)",
    color: "var(--color-warning)",
  },
  danger: {
    bg: "rgba(239, 68, 68, 0.1)",
    border: "rgba(239, 68, 68, 0.25)",
    color: "var(--color-danger)",
  },
};

function Alert({ children, variant = "info", title, className = "" }) {
  const style = variants[variant] || variants.info;

  return (
    <div
      className={`rounded-xl px-4 py-3 text-sm ${className}`}
      style={{
        background: style.bg,
        border: `1px solid ${style.border}`,
        color: style.color,
      }}
      role="alert"
    >
      {title && <p className="font-semibold mb-1">{title}</p>}
      <div style={{ color: "var(--text-primary)" }}>{children}</div>
    </div>
  );
}

export default Alert;
