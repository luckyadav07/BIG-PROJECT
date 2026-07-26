function Card({
  children,
  className = "",
  hover = false,
  variant = "default",
  ...props
}) {
  const variants = {
    default: {
      background: "var(--bg-card)",
      border: "1px solid var(--border-color)",
      boxShadow: "var(--shadow-sm)",
    },
    elevated: {
      background: "var(--bg-card)",
      border: "1px solid var(--border-color)",
      boxShadow: "var(--shadow-md)",
    },
    interactive: {
      background: "var(--bg-card)",
      border: "1px solid var(--border-color)",
      boxShadow: "var(--shadow-sm)",
    },
    ai: {
      background: "var(--bg-card)",
      border: "1px solid var(--border-color)",
      boxShadow: "var(--shadow-sm)",
    },
  };

  const style = variants[variant] || variants.default;

  return (
    <div
      className={`rounded-xl p-6 transition-all duration-300 ${
        hover || variant === "interactive"
          ? "hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
          : ""
      } ${variant === "ai" ? "ai-gradient-border" : ""} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
