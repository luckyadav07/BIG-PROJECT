import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
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

  const addToast = useUIStore((s) => s.addToast);

  useEffect(() => {
    fetchJobs();
  }, []);

  const getJobId = (job) => job?.id || job?._id;

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
      type: "Full-time",
      salary: "",
      description: "",
      status: "active",
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
      type: job.type || "Full-time",
      salary: job.salary || "",
      description: job.description || "",
      status: job.status || "active",
    });

    setError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingJob(null);
    setError("");
  };

  const parseApiError = (apiError) => {
    if (!apiError) return null;
    if (typeof apiError === "string") return apiError;
    if (apiError.message) return apiError.message;
    if (apiError.error) return apiError.error;
    if (Array.isArray(apiError)) return apiError.join(" ");

    const values = Object.values(apiError).flatMap((value) => {
      if (typeof value === "string") return [value];
      if (Array.isArray(value)) return value;
      return [];
    });
    return values.join(" ") || null;
  };

  const handleFieldChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      if (editingJob) {
<<<<<<< HEAD
        const response = await updateAdminJob(
          getJobId(editingJob),
          form
        );

        const updatedJob =
          response?.job ||
          response?.data?.job ||
          response?.data ||
          response;

        setJobs((prev) =>
          prev.map((job) =>
            getJobId(job) === getJobId(updatedJob)
              ? updatedJob
              : job
=======
        const response = await updateAdminJob(getJobId(editingJob), form);
        const updatedJob = response?.job || response;

        setJobs((prev) =>
          prev.map((job) =>
            getJobId(job) === getJobId(updatedJob) ? updatedJob : job
>>>>>>> d797af7 (CHANGES)
          )
        );

        addToast("Job updated successfully");
      } else {
        const response = await createAdminJob(form);
<<<<<<< HEAD

        const createdJob =
          response?.job ||
          response?.data?.job ||
          response?.data ||
          response;
=======
        const createdJob = response?.job || response;
>>>>>>> d797af7 (CHANGES)

        setJobs((prev) => [createdJob, ...prev]);

        addToast("Job created successfully");
      }

      closeModal();
    } catch (err) {
<<<<<<< HEAD
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to save job."
=======
      console.error("========== JOB CREATION ERROR ==========");
      console.error("Full Error:", err);
      console.error("Response:", err.response);
      console.error("Status:", err.response?.status);
      console.error("Data:", err.response?.data);
      console.error("Message:", err.response?.data?.message);
      console.error("Errors:", err.response?.data?.errors);

      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Unable to save job."
      );

      addToast(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Unable to save job.",
        "danger"
>>>>>>> d797af7 (CHANGES)
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

      addToast("Job removed successfully");
    } catch (err) {
      addToast(
        err.response?.data?.message ||
          err.message ||
          "Unable to delete job.",
        "danger"
      );
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Job Management
          </h1>
          <p className="text-gray-400">
            Manage job postings, update listings, and remove outdated
            roles.
          </p>
        </div>

        <Button size="sm" onClick={openCreateModal}>
          <Plus size={16} />
          Create Job
        </Button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <Card className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 bg-white/5">
                <th className="px-4 py-3">Job ID</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-8 text-center text-gray-400"
                  >
                    Loading jobs...
                  </td>
                </tr>
              ) : !Array.isArray(jobs) || jobs.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-8 text-center text-gray-400"
                  >
                    No jobs found. Create the first job post to get
                    started.
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr
                    key={getJobId(job)}
                    className="border-t border-white/5 hover:bg-white/5"
                  >
                    <td className="px-4 py-3 text-gray-400">
                      {getJobId(job)}
                    </td>

                    <td className="px-4 py-3 text-white">
                      {job.title}
                    </td>

                    <td className="px-4 py-3 text-gray-400">
                      {job.company}
                    </td>

                    <td className="px-4 py-3 text-gray-400">
                      {job.location || "—"}
                    </td>

                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          job.status === "active"
                            ? "success"
                            : "warning"
                        }
                      >
                        {job.status || "draft"}
                      </Badge>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(job)}
                          className="text-accent hover:text-accent/80"
                        >
                          <Edit size={16} />
                        </button>

                        <button
                          onClick={() => handleDelete(job)}
                          className="text-danger hover:text-danger/80"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-navy-light border border-white/10 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {editingJob ? "Edit Job" : "Create Job"}
                </h2>

                <p className="text-sm text-gray-400">
                  Use backend job admin controls to keep listings up to
                  date.
                </p>
              </div>

              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Job Title"
                value={form.title}
<<<<<<< HEAD
                onChange={(e) =>
                  handleFieldChange("title", e.target.value)
                }
=======
                onChange={(e) => handleFieldChange("title", e.target.value)}
                placeholder="Frontend Developer"
>>>>>>> d797af7 (CHANGES)
                required
              />

              <Input
                label="Company"
                value={form.company}
<<<<<<< HEAD
                onChange={(e) =>
                  handleFieldChange("company", e.target.value)
                }
                required
              />

              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Location"
                  placeholder="Bangalore, India"
                  value={form.location}
                  onChange={(e) =>
                    handleFieldChange("location", e.target.value)
                  }
                />

                <Input
                  label="Job Type"
                  placeholder="Full-time"
                  value={form.type}
                  onChange={(e) =>
                    handleFieldChange("type", e.target.value)
                  }
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Salary"
                  placeholder="₹12,00,000 - ₹18,00,000"
                  value={form.salary}
                  onChange={(e) =>
                    handleFieldChange("salary", e.target.value)
                  }
                />

                <Input
                  label="Status"
                  placeholder="active"
                  value={form.status}
                  onChange={(e) =>
                    handleFieldChange("status", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>

                <textarea
                  rows={5}
                  value={form.description}
                  onChange={(e) =>
                    handleFieldChange(
                      "description",
                      e.target.value
                    )
                  }
                  className="w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Write the job description and requirements here..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
=======
                onChange={(e) => handleFieldChange("company", e.target.value)}
                placeholder="Google"
                required
              />

              <Input
                label="Location"
                value={form.location}
                onChange={(e) => handleFieldChange("location", e.target.value)}
                placeholder="Bangalore"
              />

              <Input
                label="Skills"
                value={form.skills}
                onChange={(e) => handleFieldChange("skills", e.target.value)}
                placeholder="React, Node.js, MongoDB"
              />

              <Input
                label="Stipend"
                type="number"
                value={form.stipend}
                onChange={(e) => handleFieldChange("stipend", e.target.value)}
                placeholder="1200000"
              />

              <Input
                label="Duration"
                value={form.duration}
                onChange={(e) => handleFieldChange("duration", e.target.value)}
                placeholder="6 Months"
              />

              <Input
                label="Deadline"
                type="date"
                value={form.deadline}
                onChange={(e) => handleFieldChange("deadline", e.target.value)}
              />

              <Input
                label="Job URL"
                value={form.jobUrl}
                onChange={(e) => handleFieldChange("jobUrl", e.target.value)}
                placeholder="https://company.com/jobs/frontend"
                required
              />

              <div className="flex justify-end gap-3 pt-3">
>>>>>>> d797af7 (CHANGES)
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeModal}
                >
                  Cancel
                </Button>

<<<<<<< HEAD
                <Button type="submit" loading={saving}>
=======
                <Button
                  type="submit"
                  loading={saving}
                >
>>>>>>> d797af7 (CHANGES)
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