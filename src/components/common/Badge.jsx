const variants = {
  success: "bg-success/20 text-success border-success/30",
  warning: "bg-warning/20 text-warning border-warning/30",
  danger: "bg-danger/20 text-danger border-danger/30",
  info: "bg-accent/20 text-accent border-accent/30",
  neutral: "bg-white/10 text-gray-300 border-white/20",
  purple: "bg-violet-100 text-violet-300 border-violet-200",
  blue: "bg-sky-100 text-sky-400 border-sky-200",
};

function Badge({ children, variant = "neutral", className = "" }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

export default Badge;
