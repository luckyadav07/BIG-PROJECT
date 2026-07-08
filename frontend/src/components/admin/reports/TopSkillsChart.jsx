import Card from "../../common/Card.jsx";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function TopSkillsChart({ data }) {

  const chartData = data.map(skill => ({
    name: skill._id,
    count: skill.count,
  }));

  return (
    <Card>

      <h2 className="text-xl font-semibold text-white mb-5">
        Top Skills
      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <BarChart data={chartData}>

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="count"
            fill="#3B82F6"
          />

        </BarChart>

      </ResponsiveContainer>

    </Card>
  );
}

export default TopSkillsChart;