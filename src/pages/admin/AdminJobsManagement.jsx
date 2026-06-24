import { Plus, Edit, Trash2, EyeOff } from "lucide-react";
import Card from "../../components/common/Card.jsx";
import Badge from "../../components/common/Badge.jsx";
import Button from "../../components/common/Button.jsx";
import { MOCK_JOBS } from "../../utils/mockData.js";

function AdminJobsManagement() {
  const jobs = MOCK_JOBS.map((j) => ({ ...j, status: "active", applications: Math.floor(Math.random() * 50) + 5 }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Job Management</h1>
        <Button size="sm"><Plus size={16} /> Create Job</Button>
      </div>

      <Card className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 bg-white/5">
                <th className="px-4 py-3">Job ID</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Applications</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-t border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3 text-gray-400">{job.id}</td>
                  <td className="px-4 py-3 text-white">{job.title}</td>
                  <td className="px-4 py-3 text-gray-400">{job.company}</td>
                  <td className="px-4 py-3"><Badge variant="success">{job.status}</Badge></td>
                  <td className="px-4 py-3 text-gray-400">{job.applications}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-accent hover:text-accent/80"><Edit size={16} /></button>
                      <button className="text-warning hover:text-warning/80"><EyeOff size={16} /></button>
                      <button className="text-danger hover:text-danger/80"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default AdminJobsManagement;
