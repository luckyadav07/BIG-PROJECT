import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Activity, ArrowRight, ShieldAlert, Users, Briefcase, FileCheck, FileSpreadsheet } from "lucide-react";
import Card from "../../components/common/Card.jsx";
import StatsCards from "../../components/admin/StatsCards.jsx";
import ApplicationsPieChart from "../../components/admin/ApplicationsPieChart.jsx";
import JobsBarChart from "../../components/admin/JobsBarChart.jsx";
import {
  getDashboardStats,
  getAnalytics,
  getRecentActivities,
} from "../../services/adminAnalyticsService.js";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalJobs: 0,
    activeUsers: 0,
  });

  const [analytics, setAnalytics] = useState({
    statusBreakdown: {},
    totalApplications: 0,
  });

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchDashboard();
    fetchAnalytics();
    fetchActivities();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const data = await getAnalytics();
      setAnalytics(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchActivities = async () => {
    try {
      const data = await getRecentActivities();
      setActivities(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Page Header */}
      <div>
        <h1 
          className="text-2xl md:text-3xl font-extrabold flex items-center gap-2.5 tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          <LayoutDashboard className="text-accent" />
          Admin Control Center
        </h1>
        <p className="text-sm mt-1 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Monitor system metrics, review candidate applications pipeline, and manage active directories.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Stats Summary Rows */}
        <motion.div variants={itemVariants}>
          <StatsCards stats={stats} />
        </motion.div>

        {/* Charts Grids */}
        <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-6">
          <ApplicationsPieChart data={analytics.statusBreakdown} />
          <JobsBarChart
            stats={{
              ...stats,
              totalApplications: analytics.totalApplications,
            }}
          />
        </motion.div>

        {/* Recent logs and quick actions */}
        <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-6">
          
          {/* Activities list */}
          <Card className="border p-6 relative overflow-hidden flex flex-col" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
            <h2 className="text-sm font-bold mb-5 pb-2 border-b flex items-center gap-2" style={{ color: "var(--text-primary)", borderColor: "var(--border-color)" }}>
              <Activity size={16} className="text-accent" />
              Recent System Log
            </h2>

            <div className="flex-1 space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
              {activities.map((activity) => (
                <div
                  key={activity._id}
                  className="flex justify-between items-start gap-4 text-xs border-b pb-2.5 last:border-b-0 last:pb-0"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                    <span className="font-semibold leading-relaxed break-words" style={{ color: "var(--text-primary)" }}>
                      {activity.description}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold shrink-0 mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {new Date(activity.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}

              {activities.length === 0 && (
                <span className="text-xs font-semibold italic" style={{ color: "var(--text-muted)" }}>
                  No recent activities recorded.
                </span>
              )}
            </div>
          </Card>

          {/* Quick shortcuts */}
          <Card className="border p-6 relative overflow-hidden" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
            <h2 className="text-sm font-bold mb-5 pb-2 border-b flex items-center gap-2" style={{ color: "var(--text-primary)", borderColor: "var(--border-color)" }}>
              <ArrowRight size={16} className="text-accent" />
              Quick Shortcuts
            </h2>

            <div className="grid sm:grid-cols-2 gap-3.5">
              {[
                { label: "Manage Jobs", path: "/admin/jobs", desc: "List, modify, or delete vacancies.", icon: Briefcase, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
                { label: "Manage Users", path: "/admin/users", desc: "Audit users directory.", icon: Users, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
                { label: "Applications", path: "/admin/applications", desc: "Verify active applications.", icon: FileSpreadsheet, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
                { label: "System Reports", path: "/admin/reports", desc: "Check demand analyses.", icon: LayoutDashboard, color: "text-accent bg-accent/10 border-accent/20" },
              ].map((shortcut) => {
                const Icon = shortcut.icon;
                return (
                  <Link
                    key={shortcut.label}
                    to={shortcut.path}
                    className="p-4 rounded-xl border transition-all duration-200 text-left flex gap-3 group relative cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                    style={{ background: "var(--bg-elevated)", borderColor: "var(--border-color)" }}
                  >
                    <div className={`h-9 w-9 shrink-0 rounded-lg flex items-center justify-center border ${shortcut.color}`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold group-hover:text-accent-light transition-colors flex items-center gap-1" style={{ color: "var(--text-primary)" }}>
                        {shortcut.label}
                        <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-[10px] mt-1 leading-normal" style={{ color: "var(--text-muted)" }}>
                        {shortcut.desc}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Card>

        </motion.div>
      </motion.div>
    </div>
  );
}

export default AdminDashboard;