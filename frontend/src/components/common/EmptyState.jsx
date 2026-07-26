import { SearchX } from "lucide-react";

function EmptyState({
  icon: Icon = SearchX,
  title = "Nothing here",
  description = "There's nothing to display.",
  action = null,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div
        className="rounded-2xl p-4 mb-4"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-color)",
        }}
      >
        <Icon size={40} style={{ color: "var(--text-muted)" }} />
      </div>

      <h3
        className="text-xl font-semibold"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h3>

      <p
        className="mt-2 max-w-md text-sm"
        style={{ color: "var(--text-secondary)" }}
      >
        {description}
      </p>

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export default EmptyState;
