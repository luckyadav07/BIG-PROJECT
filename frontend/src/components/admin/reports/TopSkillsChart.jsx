import Card from "../../common/Card.jsx";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

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
        <p className="mb-1 font-bold" style={{ color: "var(--text-primary)" }}>{payload[0].payload.name}</p>
        <p className="text-blue-400">Tagged: <span className="font-extrabold">{payload[0].value} candidates</span></p>
      </div>
    );
  }
  return null;
};

function TopSkillsChart({ data = [] }) {
  const chartData = (data || []).map(skill => ({
    name: skill._id || "Unknown",
    count: skill.count || 0,
  }));

  return (
    <Card className="border relative overflow-hidden flex flex-col p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

      <h2 className="text-sm font-bold mb-5 tracking-tight" style={{ color: "var(--text-primary)" }}>
        In-Demand Technical Skills
      </h2>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.08)" />
            <XAxis 
              dataKey="name" 
              stroke="rgba(128, 128, 128, 0.4)" 
              fontSize={10} 
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="rgba(128, 128, 128, 0.4)" 
              fontSize={10} 
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="count"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              barSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default TopSkillsChart;