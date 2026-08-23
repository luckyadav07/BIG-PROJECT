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
        className="rounded-xl border border-white/10 p-3 shadow-md text-xs font-semibold backdrop-blur-md"
        style={{ background: "rgba(20, 24, 32, 0.95)" }}
      >
        <p className="text-white capitalize mb-1">{payload[0].name}</p>
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
      className="border border-white/5 rounded-2xl p-6 h-[380px] relative overflow-hidden flex flex-col"
      style={{
        background: "linear-gradient(135deg, rgba(26, 31, 43, 0.8) 0%, rgba(20, 24, 32, 0.9) 100%)",
      }}
    >
      <div className="absolute top-0 right-0 w-44 h-44 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <h2 className="text-sm font-bold text-white mb-5 tracking-tight">
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
              wrapperStyle={{ fontSize: "10px", fontWeight: "bold", color: "var(--text-secondary)", paddingTop: "15px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}