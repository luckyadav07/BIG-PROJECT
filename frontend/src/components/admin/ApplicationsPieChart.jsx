import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

const COLORS = [
  "#3b82f6", // Blue - Applied
  "#10b981", // Green - Accepted
  "#f59e0b", // Yellow - Interviewing
  "#ef4444", // Red - Rejected
  "#8b5cf6", // Purple - Offer
];

// Styled Custom Tooltip for Recharts
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div 
        className="rounded-xl border p-3 shadow-md text-xs font-semibold backdrop-blur-md"
        style={{ 
          background: "var(--bg-elevated)", 
          borderColor: "var(--border-color)",
          color: "var(--text-primary)"
        }}
      >
        <p className="capitalize mb-1" style={{ color: "var(--text-primary)" }}>{payload[0].name}</p>
        <p className="text-accent-light font-bold">Applications: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function ApplicationsPieChart({ data }) {
  const chartData = Object.entries(data || {}).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div 
      className="border rounded-2xl p-6 h-[380px] relative overflow-hidden flex flex-col"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="absolute top-0 right-0 w-44 h-44 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <h2 
        className="text-sm font-bold mb-5 tracking-tight"
        style={{ color: "var(--text-primary)" }}
      >
        Applications by Status
      </h2>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              outerRadius={90}
              innerRadius={50}
              paddingAngle={3}
              label={false}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth={1}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />

            <Legend 
              verticalAlign="bottom" 
              iconSize={8} 
              iconType="circle"
              wrapperStyle={{ fontSize: "10px", fontWeight: "bold", paddingTop: "15px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}