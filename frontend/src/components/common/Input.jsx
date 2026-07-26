import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function Input({
  label,
  type = "text",
  placeholder,
  error,
  className = "",
  id,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || label?.toLowerCase().replace(/\s/g, "-");
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          type={inputType}
          placeholder={placeholder}
          {...props}
          className={`focus-ring w-full rounded-xl px-4 py-2.5 text-sm transition disabled:opacity-50 ${
            isPassword ? "pr-11" : ""
          } ${error ? "border-[var(--color-danger)]" : ""}`}
          style={{
            background: "var(--bg-input)",
            color: "var(--text-primary)",
            border: error
              ? "1px solid var(--color-danger)"
              : "1px solid var(--border-color)",
          }}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 transition-colors hover:text-[var(--text-primary)]"
            style={{ color: "var(--text-muted)" }}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-sm" style={{ color: "var(--color-danger)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
