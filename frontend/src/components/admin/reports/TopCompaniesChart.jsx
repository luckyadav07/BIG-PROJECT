import Card from "../../common/Card.jsx";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function TopCompaniesChart({ data }) {

  const chartData = data.map(company => ({
    name: company._id,
    jobs: company.jobs,
  }));

  return (
    <Card>

      <h2 className="text-xl font-semibold text-white mb-5">
        Top Companies
      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <BarChart data={chartData}>

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="jobs"
            fill="#10B981"
          />

        </BarChart>

      </ResponsiveContainer>

    </Card>
  );
}

export default TopCompaniesChart;