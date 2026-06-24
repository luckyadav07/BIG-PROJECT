const variants = {
  success: "bg-success/20 text-success border-success/30",
  warning: "bg-warning/20 text-warning border-warning/30",
  danger: "bg-danger/20 text-danger border-danger/30",
  info: "bg-accent/20 text-accent border-accent/30",
  neutral: "bg-white/10 text-gray-300 border-white/20",
};

function Badge({ children, variant = "neutral", className = "" }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

export default Badge;
