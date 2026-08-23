import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Sparkles, Loader2 } from "lucide-react";
import StatsCards from "../../components/admin/StatsCards.jsx";
import TopSkillsChart from "../../components/admin/reports/TopSkillsChart.jsx";
import TopCompaniesChart from "../../components/admin/reports/TopCompaniesChart.jsx";
import { getReports } from "../../services/adminReportsService.js";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

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
      <div className="h-[calc(100vh-12rem)] flex flex-col justify-center items-center gap-4 text-center">
        <Loader2 size={36} className="text-accent animate-spin" />
        <p className="text-sm font-semibold text-gray-400">Loading system demand reports...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2.5 tracking-tight">
          <LayoutDashboard className="text-accent" />
          System Reports & Demands
        </h1>
        <p className="text-sm text-gray-400 mt-1 leading-relaxed">
          Aggregated details on vacancy distributions, candidate skill concentrations, and active hiring partners.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* KPI metrics row */}
        <motion.div variants={itemVariants}>
          <StatsCards
            stats={{
              totalUsers: reports.totalUsers,
              totalJobs: reports.totalJobs,
              totalAdmins: reports.totalAdmins,
              activeUsers: reports.totalUsers,
            }}
          />
        </motion.div>

        {/* Analytics charts grid */}
        <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-6 mt-8">
          <TopSkillsChart data={reports.topSkills} />
          <TopCompaniesChart data={reports.topCompanies} />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default AdminReports;