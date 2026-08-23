import { useEffect, useState } from "react";
import { FileSpreadsheet } from "lucide-react";
import {
  getAllApplications,
  updateApplicationStatus,
} from "../../services/applicationService.js";
import useUIStore from "../../store/uiStore.js";
import { getErrorMessage } from "../../utils/errorHandler.js";
import LoadingState from "../../components/common/LoadingState.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import Button from "../../components/common/Button.jsx";
import Badge from "../../components/common/Badge.jsx";

const STATUS_OPTIONS = [
  "Applied",
  "Shortlisted",
  "Interview",
  "Accepted",
  "Rejected",
];

const statusColor = {
  Applied: "text-amber-500",
  Shortlisted: "text-blue-500",
  Interview: "text-purple-500",
  Accepted: "text-emerald-500",
  Rejected: "text-rose-500",
};

const badgeVariants = {
  Applied: "warning",
  Shortlisted: "blue",
  Interview: "purple",
  Accepted: "success",
  Rejected: "danger",
};

function AdminApplicationsManagement() {
  const [applications, setApplications] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const showToast = useUIStore((s) => s.showToast);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const data = await getAllApplications();

      setApplications(data);

      const statusMap = {};
      data.forEach((app) => {
        statusMap[app._id] = app.status;
      });

      setSelectedStatus(statusMap);
    } catch (err) {
      showToast({ message: getErrorMessage(err), type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (id) => {
    try {
      await updateApplicationStatus(id, selectedStatus[id]);

      setApplications((prev) =>
        prev.map((app) =>
          app._id === id
            ? { ...app, status: selectedStatus[id] }
            : app
        )
      );

      showToast({ message: "Application status updated successfully!", type: "success" });
      setEditingId(null);
    } catch (err) {
      showToast({ message: getErrorMessage(err), type: "danger" });
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (applications.length === 0) {
    return (
      <EmptyState
        title="No Applications"
        description="No users have applied for jobs yet."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4" style={{ borderColor: "var(--border-color)" }}>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2.5 tracking-tight" style={{ color: "var(--text-primary)" }}>
            <FileSpreadsheet className="text-accent" />
            Manage Applications
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            Review candidate job applications, track states, and update decisions.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: "var(--border-color)", background: "var(--bg-card)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase font-extrabold" style={{ color: "var(--text-secondary)", background: "var(--bg-elevated)" }}>
              <th className="px-5 py-4">Applicant</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Job</th>
              <th className="px-5 py-4">Company</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr
                key={app._id}
                className="border-t hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors"
                style={{ borderColor: "var(--border-color)" }}
              >
                <td className="px-5 py-4 font-bold" style={{ color: "var(--text-primary)" }}>
                  {app.userId?.name}
                </td>

                <td className="px-5 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>
                  {app.userId?.email}
                </td>

                <td className="px-5 py-4 font-bold" style={{ color: "var(--text-primary)" }}>
                  {app.jobId?.title}
                </td>

                <td className="px-5 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>
                  {app.jobId?.company}
                </td>

                 <td className="px-5 py-4">
                  {editingId === app._id ? (
                    <select
                      value={selectedStatus[app._id] || app.status}
                      onChange={(e) =>
                        setSelectedStatus((prev) => ({
                          ...prev,
                          [app._id]: e.target.value,
                        }))
                      }
                      className={`rounded-xl border px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer ${statusColor[selectedStatus[app._id] || app.status]}`}
                      style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Badge
                      variant={badgeVariants[app.status] || "neutral"}
                      className="cursor-pointer hover:opacity-85 transition-opacity"
                      onClick={() => {
                        setSelectedStatus((prev) => ({ ...prev, [app._id]: app.status }));
                        setEditingId(app._id);
                      }}
                    >
                      {app.status}
                    </Badge>
                  )}
                </td>

                <td className="px-5 py-4 text-center">
                  {editingId === app._id ? (
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleSave(app._id)}
                        disabled={selectedStatus[app._id] === app.status}
                        className="!text-xs font-bold py-1.5 px-3 rounded-lg"
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingId(null)}
                        className="!text-xs font-bold py-1.5 px-3 rounded-lg"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedStatus((prev) => ({ ...prev, [app._id]: app.status }));
                        setEditingId(app._id);
                      }}
                      className="!text-xs font-bold py-1.5 px-3 rounded-lg"
                    >
                      Edit
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminApplicationsManagement;