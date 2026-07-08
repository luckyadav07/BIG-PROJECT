import { useEffect, useState } from "react";

import StatsCards from "../../components/admin/StatsCards.jsx";
import TopSkillsChart from "../../components/admin/reports/TopSkillsChart.jsx";
import TopCompaniesChart from "../../components/admin/reports/TopCompaniesChart.jsx";

import { getReports } from "../../services/adminReportsService.js";

function AdminReports() {
  const [reports, setReports] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const data = await getReports();
      setReports(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!reports) {
    return (
      <div className="text-white">
        Loading Reports...
      </div>
    );
  }

  return (
    <div>

      <h1 className="text-3xl font-bold text-white mb-6">
        Reports & Analytics
      </h1>

      <StatsCards
        stats={{
          totalUsers: reports.totalUsers,
          totalJobs: reports.totalJobs,
          totalAdmins: reports.totalAdmins,
          activeUsers: reports.totalUsers,
        }}
      />

      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        <TopSkillsChart
          data={reports.topSkills}
        />

        <TopCompaniesChart
          data={reports.topCompanies}
        />

      </div>

    </div>
  );
}

export default AdminReports;