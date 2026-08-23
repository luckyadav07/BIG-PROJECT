import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, X, Briefcase } from "lucide-react";
import Card from "../../components/common/Card.jsx";
import Badge from "../../components/common/Badge.jsx";
import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx";
import useUIStore from "../../store/uiStore.js";
import {
  getAdminJobs,
  createAdminJob,
  updateAdminJob,
  deleteAdminJob,
} from "../../services/adminService.js";

function AdminJobsManagement() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [editingJob, setEditingJob] = useState(null);

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    skills: "",
    stipend: "",
    deadline: "",
    duration: "",
    jobUrl: "",
  });

  const showToast = useUIStore((s) => s.showToast);

  useEffect(() => {
    fetchJobs();
  }, []);

  const getJobId = (job) => job?.id || job?._id;
  const companies = [...new Set(jobs.map((job) => job.company).filter(Boolean))];
  const locations = [...new Set(jobs.map((job) => job.location).filter(Boolean))];
  const filteredJobs = jobs.filter((job) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      job.title?.toLowerCase().includes(keyword) ||
      job.company?.toLowerCase().includes(keyword) ||
      job.location?.toLowerCase().includes(keyword);

    const matchesCompany =
      !companyFilter || job.company === companyFilter;

    const matchesLocation =
      !locationFilter || job.location === locationFilter;

    return matchesSearch && matchesCompany && matchesLocation;
  });

  const fetchJobs = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getAdminJobs();

      const jobsArray =
        Array.isArray(response)
          ? response
          : Array.isArray(response?.jobs)
          ? response.jobs
          : Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response?.data?.jobs)
          ? response.data.jobs
          : [];

      setJobs(jobsArray);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load jobs."
      );
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingJob(null);
    setForm({
      title: "",
      company: "",
      location: "",
      skills: "",
      stipend: "",
      deadline: "",
      duration: "",
      jobUrl: "",
    });
    setError("");
    setModalOpen(true);
  };

  const openEditModal = (job) => {
    setEditingJob(job);

    setForm({
      title: job.title || "",
      company: job.company || "",
      location: job.location || "",
      skills: Array.isArray(job.skills)
        ? job.skills.join(", ")
        : job.skills || "",
      stipend: job.stipend || "",
      deadline: job.deadline
        ? job.deadline.substring(0, 10)
        : "",
      duration: job.duration || "",
      jobUrl: job.jobUrl || "",
    });

    setError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingJob(null);
    setError("");
  };

  const handleFieldChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");

    const payload = {
      title: form.title,
      company: form.company,
      location: form.location,
      skills: form.skills
        ? form.skills.split(",").map((s) => s.trim())
        : [],
      stipend: Number(form.stipend) || 0,
      deadline: form.deadline,
      duration: form.duration,
      jobUrl: form.jobUrl,
    };

    try {
      if (editingJob) {
        const response = await updateAdminJob(
          getJobId(editingJob),
          payload
        );

        const updatedJob =
          response?.data?.job ||
          response?.job ||
          response?.data ||
          response;

        setJobs((prev) =>
          prev.map((job) =>
            getJobId(job) === getJobId(updatedJob)
              ? updatedJob
              : job
          )
        );

        showToast({ message: "Job updated successfully", type: "success" });
      } else {
        const response = await createAdminJob(payload);

        const createdJob =
          response?.data?.job ||
          response?.job ||
          response?.data ||
          response;

        setJobs((prev) => [createdJob, ...prev]);

        showToast({ message: "Job created successfully", type: "success" });
      }

      closeModal();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Unable to save job."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (job) => {
    if (!window.confirm("Delete this job permanently?")) return;

    try {
      await deleteAdminJob(getJobId(job));

      setJobs((prev) =>
        prev.filter(
          (item) => getJobId(item) !== getJobId(job)
        )
      );

      showToast({ message: "Job removed successfully", type: "success" });
    } catch (err) {
      showToast({
        message: err.response?.data?.message || err.message || "Unable to delete job.",
        type: "danger"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4" style={{ borderColor: "var(--border-color)" }}>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2.5 tracking-tight" style={{ color: "var(--text-primary)" }}>
            <Briefcase className="text-accent" />
            Job Management
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            Manage job postings, update listings, and remove outdated roles.
          </p>
        </div>

        <Button size="sm" onClick={openCreateModal} className="font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 shrink-0">
          <Plus size={16} />
          Create Job
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search by job title, company or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />

        <select
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
          className="rounded-xl border px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
          style={{ background: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}
        >
          <option value="">All Companies</option>
          {companies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>

        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="rounded-xl border px-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
          style={{ background: "var(--bg-card)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}
        >
          <option value="">All Locations</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="rounded-xl border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <Card className="!p-0 overflow-hidden border" style={{ borderColor: "var(--border-color)", background: "var(--bg-card)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase font-extrabold" style={{ color: "var(--text-secondary)", background: "var(--bg-elevated)" }}>
                <th className="px-5 py-4">S.No</th>
                <th className="px-5 py-4">Title</th>
                <th className="px-5 py-4">Company</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-5 py-8 text-center" style={{ color: "var(--text-secondary)" }}>
                    Loading jobs...
                  </td>
                </tr>
              ) : !Array.isArray(filteredJobs) || filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-5 py-8 text-center" style={{ color: "var(--text-secondary)" }}>
                    No jobs found. Create the first job post to get started.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job, index) => (
                  <tr
                    key={getJobId(job)}
                    className="border-t hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors"
                    style={{ borderColor: "var(--border-color)" }}
                  >
                    <td className="px-5 py-4 font-semibold" style={{ color: "var(--text-secondary)" }}>
                      {index + 1}
                    </td>

                    <td className="px-5 py-4 font-bold" style={{ color: "var(--text-primary)" }}>
                      {job.title}
                    </td>

                    <td className="px-5 py-4 font-medium" style={{ color: "var(--text-secondary)" }}>
                      {job.company}
                    </td>

                    <td className="px-5 py-4" style={{ color: "var(--text-secondary)" }}>
                      {job.location || "—"}
                    </td>

                    <td className="px-5 py-4">
                      <Badge variant={job.status === "active" ? "success" : "warning"}>
                        {job.status || "draft"}
                      </Badge>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => openEditModal(job)}
                          className="text-accent hover:text-accent/80 transition-colors"
                        >
                          <Edit size={16} />
                        </button>

                        <button
                          onClick={() => handleDelete(job)}
                          className="text-danger hover:text-danger/80 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div 
            className="w-full max-w-2xl rounded-3xl border p-6 shadow-2xl"
            style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {editingJob ? "Edit Job Post" : "Create Job Post"}
                </h2>
                <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                  Fill out the fields below to update the vacancy.
                </p>
              </div>

              <button
                onClick={closeModal}
                className="hover:opacity-80 transition-opacity"
                style={{ color: "var(--text-secondary)" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Job Title"
                placeholder="Frontend Developer"
                value={form.title}
                onChange={(e) => handleFieldChange("title", e.target.value)}
                required
              />

              <Input
                label="Company"
                placeholder="Google"
                value={form.company}
                onChange={(e) => handleFieldChange("company", e.target.value)}
                required
              />

              <Input
                label="Location"
                placeholder="Bangalore"
                value={form.location}
                onChange={(e) => handleFieldChange("location", e.target.value)}
              />

              <Input
                label="Skills (comma separated)"
                placeholder="React, Node.js, MongoDB"
                value={form.skills}
                onChange={(e) => handleFieldChange("skills", e.target.value)}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Stipend"
                  type="number"
                  placeholder="25000"
                  value={form.stipend}
                  onChange={(e) => handleFieldChange("stipend", e.target.value)}
                />

                <Input
                  label="Duration"
                  placeholder="6 Months"
                  value={form.duration}
                  onChange={(e) => handleFieldChange("duration", e.target.value)}
                />
              </div>

              <Input
                label="Deadline"
                type="date"
                value={form.deadline}
                onChange={(e) => handleFieldChange("deadline", e.target.value)}
              />

              <Input
                label="Job URL"
                placeholder="https://company.com/careers/job123"
                value={form.jobUrl}
                onChange={(e) => handleFieldChange("jobUrl", e.target.value)}
                required
              />

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeModal}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  loading={saving}
                >
                  {editingJob ? "Update Job" : "Create Job"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminJobsManagement;