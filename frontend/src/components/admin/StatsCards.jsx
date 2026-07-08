import Card from "../common/Card.jsx";
import { Users, Briefcase, FileCheck, Activity } from "lucide-react";

export default function StatsCards({ stats }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase text-gray-400">
              Total Users
            </p>
            <p className="text-3xl font-bold text-white mt-2">
              {stats.totalUsers}
            </p>
          </div>

          <Users className="text-blue-400" size={28} />
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase text-gray-400">
              Total Jobs
            </p>

            <p className="text-3xl font-bold text-white mt-2">
              {stats.totalJobs}
            </p>
          </div>

          <Briefcase className="text-green-400" size={28} />
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase text-gray-400">
              Total Admins
            </p>

            <p className="text-3xl font-bold text-white mt-2">
              {stats.totalAdmins}
            </p>
          </div>

          <FileCheck className="text-yellow-400" size={28} />
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase text-gray-400">
              Active Users
            </p>

            <p className="text-3xl font-bold text-white mt-2">
              {stats.activeUsers}
            </p>
          </div>

          <Activity className="text-red-400" size={28} />
        </div>
      </Card>

    </div>
  );
}