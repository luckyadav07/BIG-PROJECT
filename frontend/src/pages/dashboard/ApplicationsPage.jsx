import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { FileSpreadsheet, Loader2 } from "lucide-react";
import Card from "../../components/common/Card.jsx";
import ApplicationCard, {
  StatusBadge,
} from "../../components/application/ApplicationCard.jsx";
import useUIStore from "../../store/uiStore.js";
import {
  getApplications,
  withdrawApplication,
} from "../../services/applicationService.js";

function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [search, setSearch] = useState("");

  const showToast = useUIStore((s) => s.showToast);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);

      const data = await getApplications();

      setApplications(data);
    } catch (err) {
      console.error(err);

      if (err.response?.status !== 404) {
        showToast({ message: "Failed to load applications", type: "error" });
      }

      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (id) => {
    try {
      await withdrawApplication(id);

      setApplications((prev) =>
        prev.filter((app) => app._id !== id)
      );

      showToast({
        message: "Application withdrawn!",
        type: "success",
      });
    } catch (err) {
      console.error(err);
      showToast({ message: "Failed to withdraw application", type: "error" });
    }
  };

  const filtered = useMemo(() => {
    let result = [...applications];

    if (statusFilter !== "all") {
      result = result.filter(
        (a) =>
          a.status.toLowerCase() ===
          statusFilter.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase();

      result = result.filter(
        (a) =>
          a.jobId?.title?.toLowerCase().includes(q) ||
          a.jobId?.company?.toLowerCase().includes(q)
      );
    }

    if (sortBy === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );
    }

    if (sortBy === "oldest") {
      result.sort(
        (a, b) =>
          new Date(a.createdAt) -
          new Date(b.createdAt)
      );
    }

    return result;
  }, [applications, statusFilter, sortBy, search]);

  if (loading) {
    return (
      <div className="h-[250px] flex flex-col justify-center items-center gap-3 text-center">
        <Loader2 size={32} className="text-accent animate-spin" />
        <p className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>
          Loading applications...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4" style={{ borderColor: "var(--border-color)" }}>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2.5 tracking-tight" style={{ color: "var(--text-primary)" }}>
            <FileSpreadsheet className="text-accent" />
            My Applications
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            Keep track of your active job applications and submission status.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by job title or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl border px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent flex-1 transition-all duration-200"
          style={{ background: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
          style={{ background: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}
        >
          <option value="all">All Status</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-xl border px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
          style={{ background: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <Card className="!p-0 overflow-hidden border" style={{ borderColor: "var(--border-color)", background: "var(--bg-card)" }}>
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
            No applications found matching the criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase font-extrabold" style={{ color: "var(--text-secondary)", background: "var(--bg-elevated)" }}>
                  <th className="px-5 py-4">Job</th>
                  <th className="px-5 py-4">Company</th>
                  <th className="px-5 py-4">Location</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Applied</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((app) => (
                  <tr
                    key={app._id}
                    className="border-t hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    <td className="px-5 py-4 font-bold" style={{ color: "var(--text-primary)" }}>
                      {app.jobId?.title}
                    </td>

                    <td className="px-5 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>
                      {app.jobId?.company}
                    </td>

                    <td className="px-5 py-4" style={{ color: "var(--text-secondary)" }}>
                      {app.jobId?.location || "—"}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={app.status} />
                    </td>

                    <td className="px-5 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4">
                      <Link
                        to={`/jobs/${app.jobId?._id}`}
                        className="text-accent hover:underline mr-4 font-bold text-xs"
                      >
                        View
                      </Link>

                      <button
                        onClick={() => handleWithdraw(app._id)}
                        className="text-danger hover:underline font-bold text-xs cursor-pointer"
                      >
                        Withdraw
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

export default ApplicationsPage;