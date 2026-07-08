import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Card from "../../components/common/Card.jsx";

import StatsCards from "../../components/admin/StatsCards.jsx";
import ApplicationsPieChart from "../../components/admin/ApplicationsPieChart.jsx";
import JobsBarChart from "../../components/admin/JobsBarChart.jsx";

import {
  getDashboardStats,
  getAnalytics,
  getRecentActivities,
} from "../../services/adminAnalyticsService.js";

function AdminDashboard() {
  const [stats, setStats] =useState({
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
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <ApplicationsPieChart
          data={analytics.statusBreakdown}
        />

        <JobsBarChart
          stats={{
            ...stats,
            totalApplications: analytics.totalApplications,
          }}
        />
      </div>

      {/* Bottom Section */}

      <div className="grid lg:grid-cols-2 gap-6">

        <Card>
          <h2 className="text-lg font-semibold text-white mb-4">
            Recent Activity
          </h2>

          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity._id}
                className="flex justify-between text-sm border-b border-white/5 pb-2"
              >
                <span className="text-gray-300">
                  {activity.description}
                </span>

                <span className="text-gray-500">
                  {new Date(activity.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-white mb-4">
            Quick Actions
          </h2>

          <div className="space-y-3">

            <Link
              to="/admin/jobs"
              className="block rounded-lg bg-white/5 hover:bg-white/10 transition px-4 py-3 text-gray-300"
            >
              Manage Jobs →
            </Link>

            <Link
              to="/admin/users"
              className="block rounded-lg bg-white/5 hover:bg-white/10 transition px-4 py-3 text-gray-300"
            >
              Manage Users →
            </Link>

          </div>
        </Card>

      </div>
    </div>
  );
}

export default AdminDashboard;