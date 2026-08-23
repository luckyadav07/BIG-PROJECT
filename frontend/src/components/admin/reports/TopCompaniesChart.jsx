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
        className="rounded-xl border border-white/10 p-3 shadow-md text-xs font-semibold backdrop-blur-md"
        style={{ background: "rgba(20, 24, 32, 0.95)" }}
      >
        <p className="text-white mb-1 font-bold">{payload[0].payload.name}</p>
        <p className="text-emerald-400">Open Jobs: <span className="font-extrabold">{payload[0].value}</span></p>
      </div>
    );
  }
  return null;
};

function TopCompaniesChart({ data = [] }) {
  const chartData = (data || []).map(company => ({
    name: company._id || "Unknown",
    jobs: company.jobs || 0,
  }));

  return (
    <Card className="border border-white/5 relative overflow-hidden flex flex-col p-6">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

      <h2 className="text-sm font-bold text-white mb-5 tracking-tight">
        Active Hiring Partners
      </h2>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
            <XAxis 
              dataKey="name" 
              stroke="rgba(255, 255, 255, 0.3)" 
              fontSize={10} 
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="rgba(255, 255, 255, 0.3)" 
              fontSize={10} 
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="jobs"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
              barSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default TopCompaniesChart;