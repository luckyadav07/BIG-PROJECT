function Input({
  label,
  type = "text",
  placeholder,
  error,
  className = "",
  id,
  ...props
}) {
  const inputId = id || label?.toLowerCase().replace(/\s/g, "-");

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-300 mb-1.5">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-lg border bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 transition focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 ${
          error ? "border-danger focus:ring-danger" : "border-white/20 focus:border-accent"
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  );
}

export default Input;
