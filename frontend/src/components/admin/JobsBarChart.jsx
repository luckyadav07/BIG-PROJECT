import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

export default function JobsBarChart({ stats }) {
  const data = [
    {
      name: "Overview",
      Users: stats.totalUsers,
      Jobs: stats.totalJobs,
      Applications: stats.totalApplications || 0,
    },
  ];

  return (
    <div className="bg-[#111827] rounded-xl p-5 h-[350px]">
      <h2 className="text-white font-semibold mb-4">
        Platform Overview
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <XAxis dataKey="name" />

          <Tooltip />

          <Bar dataKey="Users" fill="#3b82f6" />
          <Bar dataKey="Jobs" fill="#22c55e" />
          <Bar dataKey="Applications" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
