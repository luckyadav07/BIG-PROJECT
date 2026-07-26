import Card from "../common/Card.jsx";

const colorMap = {
  green: {
    value: "text-success",
    icon: "bg-success/10 text-success",
  },
  blue: {
    value: "text-accent",
    icon: "bg-accent/10 text-accent",
  },
  yellow: {
    value: "text-warning",
    icon: "bg-warning/10 text-warning",
  },
};

function StatCard({ icon, title, value, trend, color = "blue" }) {
  const palette = colorMap[color] || colorMap.blue;

  return (
    <Card hover className="!p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p
            className="text-caption uppercase tracking-wider"
            style={{ color: "var(--text-secondary)" }}
          >
            {title}
          </p>

          <p className={`text-3xl font-bold mt-1.5 tracking-tight ${palette.value}`}>
            {value}
          </p>

          {trend && (
            <p
              className="text-caption mt-1.5"
              style={{ color: "var(--text-muted)" }}
            >
              {trend}
            </p>
          )}
        </div>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${palette.icon}`}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}

export default StatCard;