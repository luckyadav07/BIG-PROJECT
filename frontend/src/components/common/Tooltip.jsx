function Tooltip({ children, label, side = "right" }) {
  const position =
    side === "right"
      ? "left-full ml-3 top-1/2 -translate-y-1/2"
      : "bottom-full mb-2 left-1/2 -translate-x-1/2";

  return (
    <div className="group/tooltip relative flex items-center">
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute ${position} z-50 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-medium opacity-0 scale-95 transition-all duration-200 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100`}
        style={{
          background: "var(--bg-elevated)",
          color: "var(--text-primary)",
          border: "1px solid var(--border-color)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default Tooltip;
