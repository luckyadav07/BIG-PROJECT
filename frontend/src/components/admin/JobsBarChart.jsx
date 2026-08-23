import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";

// Styled Custom Tooltip for Recharts
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div 
        className="rounded-xl border border-white/10 p-3 shadow-md text-xs font-semibold backdrop-blur-md"
        style={{ background: "rgba(20, 24, 32, 0.95)" }}
      >
        <p className="text-white mb-2 font-bold">{payload[0].payload.name}</p>
        <div className="space-y-1">
          {payload.map((item) => (
            <p key={item.name} style={{ color: item.color }}>
              {item.name}: <span className="font-extrabold">{item.value}</span>
            </p>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function JobsBarChart({ stats }) {
  const data = [
    {
      name: "Users",
      Total: stats.totalUsers,
      Active: stats.activeUsers || 0,
    },
    {
      name: "Jobs",
      Total: stats.totalJobs,
      Active: stats.totalJobs, // same for bar presentation
    },
    {
      name: "Apps",
      Total: stats.totalApplications || 0,
      Active: stats.totalApplications || 0,
    }
  ];

  return (
    <div 
      className="border border-white/5 rounded-2xl p-6 h-[380px] relative overflow-hidden flex flex-col"
      style={{
        background: "linear-gradient(135deg, rgba(26, 31, 43, 0.8) 0%, rgba(20, 24, 32, 0.9) 100%)",
      }}
    >
      <div className="absolute top-0 right-0 w-44 h-44 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <h2 className="text-sm font-bold text-white mb-5 tracking-tight">
        Platform Overview
      </h2>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
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
            
            <Bar dataKey="Total" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={24} />
            <Bar dataKey="Active" fill="#10b981" radius={[4, 4, 0, 0]} barSize={24} />
            
            <Legend 
              verticalAlign="bottom" 
              iconSize={8} 
              iconType="circle"
              wrapperStyle={{ fontSize: "10px", fontWeight: "bold", color: "var(--text-secondary)", paddingTop: "15px" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
