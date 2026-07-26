const variants = {
  success: "bg-success/15 text-success border-success/25",
  warning: "bg-warning/15 text-warning border-warning/25",
  danger: "bg-danger/15 text-danger border-danger/25",
  info: "bg-accent/15 text-accent border-accent/25",
  neutral: "",
  purple: "bg-violet-500/15 text-violet-400 border-violet-500/25",
  blue: "bg-sky-500/15 text-sky-400 border-sky-500/25",
};

function Badge({ children, variant = "neutral", className = "" }) {
  const isNeutral = variant === "neutral";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${variants[variant] || variants.neutral} ${className}`}
      style={
        isNeutral
          ? {
              background: "var(--bg-elevated)",
              color: "var(--text-secondary)",
              borderColor: "var(--border-color)",
            }
          : undefined
      }
    >
      {children}
    </span>
  );
}

export default Badge;
