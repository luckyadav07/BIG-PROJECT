import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

function Dropdown({ trigger, children, align = "right", className = "" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const alignClass = align === "right" ? "right-0" : "left-0";

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((v) => !v);
          }
        }}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        className="focus-ring rounded-lg"
      >
        {trigger}
      </div>

      {open && (
        <div
          className={`absolute ${alignClass} top-full mt-2 min-w-[200px] z-50 animate-fade-in rounded-xl py-1.5`}
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            boxShadow: "var(--shadow-lg)",
          }}
          role="menu"
        >
          {typeof children === "function"
            ? children(() => setOpen(false))
            : children}
        </div>
      )}
    </div>
  );
}

export function DropdownItem({
  children,
  onClick,
  icon: Icon,
  danger = false,
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className="focus-ring flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors hover:bg-[var(--sidebar-hover-bg)]"
      style={{
        color: danger ? "var(--color-danger)" : "var(--text-primary)",
      }}
    >
      {Icon && <Icon size={16} style={{ color: "var(--text-secondary)" }} />}
      {children}
    </button>
  );
}

export function DropdownChevron({ open }) {
  return (
    <ChevronDown
      size={14}
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      style={{ color: "var(--text-muted)" }}
    />
  );
}

export default Dropdown;
