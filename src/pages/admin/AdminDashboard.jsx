import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Briefcase,
  FileCheck,
  Activity,
} from "lucide-react";

import Card from "../../components/common/Card.jsx";
import { getDashboardStats } from "../../services/adminDashboardService.js";
import { getRecentActivities } from "../../services/activityService.js";

function AdminDashboard() {
  const [stats, setStats] =useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalJobs: 0,
    activeUsers: 0,
  });

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchDashboard();
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

  const fetchActivities = async () => {
    try {
        const data = await getRecentActivities();
        setActivities(data);
    } catch (err) {
        console.log(err);
    }
};

  

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400">
                Total Users
              </p>

              <p className="text-3xl font-bold text-white mt-2">
                {stats.totalUsers}
              </p>
            </div>

            <Users className="text-blue-400" size={26} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400">
                Total Jobs
              </p>

              <p className="text-3xl font-bold text-white mt-2">
                {stats.totalJobs}
              </p>
            </div>

            <Briefcase className="text-green-400" size={26} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400">
                Total Admins
              </p>

              <p className="text-3xl font-bold text-white mt-2">
                {stats.totalAdmins}
              </p>
            </div>

            <FileCheck className="text-yellow-400" size={26} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400">
                Active Users
              </p>

              <p className="text-3xl font-bold text-white mt-2">
                {stats.activeUsers}
              </p>
            </div>

            <Activity className="text-red-400" size={26} />
          </div>
        </Card>

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