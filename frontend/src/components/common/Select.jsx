import { ChevronDown } from "lucide-react";

function Select({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  error,
  className = "",
  id,
}) {
  const selectId = id || label?.toLowerCase().replace(/\s/g, "-");

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          className={`focus-ring w-full appearance-none rounded-xl px-4 py-2.5 pr-10 text-sm transition disabled:opacity-50 ${
            error ? "border-[var(--color-danger)]" : ""
          }`}
          style={{
            background: "var(--bg-input)",
            color: "var(--text-primary)",
            border: error
              ? "1px solid var(--color-danger)"
              : "1px solid var(--border-color)",
          }}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
          style={{ color: "var(--text-muted)" }}
        />
      </div>

      {error && (
        <p className="mt-1.5 text-sm" style={{ color: "var(--color-danger)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default Select;
