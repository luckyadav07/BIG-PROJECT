const variants = {
  primary:
    "accent-gradient text-white shadow-md hover:shadow-lg hover:brightness-110 active:scale-[0.98]",
  secondary:
    "hover:bg-[var(--sidebar-hover-bg)] active:scale-[0.98]",
  outline:
    "border active:scale-[0.98] hover:bg-[var(--sidebar-hover-bg)] bg-transparent",
  ghost:
    "hover:bg-[var(--sidebar-hover-bg)] active:scale-[0.98] bg-transparent",
  success:
    "bg-[var(--color-success)] text-white hover:brightness-110 active:scale-[0.98] shadow-sm",
  danger:
    "bg-[var(--color-danger)] text-white hover:brightness-110 active:scale-[0.98] shadow-sm",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm rounded-lg gap-1.5",
  md: "px-5 py-2.5 text-sm rounded-xl gap-2",
  lg: "px-6 py-3 text-base rounded-xl gap-2",
};

function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  type = "button",
  onClick,
  ...props
}) {
  const isOutlineOrSecondary =
    variant === "outline" || variant === "secondary" || variant === "ghost";

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        focus-ring inline-flex items-center justify-center font-medium
        transition-all duration-200
        ${variants[variant] || variants.primary}
        ${sizes[size]}
        ${disabled || loading ? "opacity-60 cursor-not-allowed pointer-events-none" : ""}
        ${className}
      `}
      style={
        isOutlineOrSecondary
          ? {
              color:
                variant === "outline"
                  ? "var(--color-accent)"
                  : "var(--text-primary)",
              borderColor:
                variant === "outline" ? "var(--color-accent)" : "transparent",
            }
          : undefined
      }
      {...props}
    >
      {loading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden
        />
      )}
      {loading ? "Loading..." : children}
    </button>
  );
}

export default Button;
