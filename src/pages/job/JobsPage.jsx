import { useEffect, useState, useMemo } from "react";
import JobCard from "../../components/job/JobCard.jsx";
import FilterPanel from "../../components/job/FilterPanel.jsx";
import Skeleton from "../../components/common/Skeleton.jsx";
import useJobStore from "../../store/jobStore.js";
import useUIStore from "../../store/uiStore.js";
import { applyJob } from "../../services/applicationService.js";

const defaultFilters = { search: "", jobType: "", experienceLevel: "", sortBy: "relevance" };

function JobsPage() {
  const { jobs, loading, fetchJobs } = useJobStore();
  const addToast = useUIStore((s) => s.addToast);
  const [filters, setFilters] = useState(defaultFilters);
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const filtered = useMemo(() => {
    let result = [...jobs];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter((j) => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q));
    }
    if (filters.jobType) result = result.filter((j) => j.jobType === filters.jobType);
    if (filters.experienceLevel) result = result.filter((j) => j.experienceLevel === filters.experienceLevel);
    if (filters.sortBy === "match") result.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    if (filters.sortBy === "newest") result.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
    return result;
  }, [jobs, filters]);

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Browse Jobs</h1>
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <FilterPanel filters={filters} onFilterChange={(f) => { setFilters(f); setPage(1); }} onReset={() => setFilters(defaultFilters)} />
        </div>
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid md:grid-cols-2 gap-4">{[1, 2, 3, 4].map((i) => <Skeleton key={i} height="200px" />)}</div>
          ) : paginated.length === 0 ? (
            <div className="text-center py-16 text-gray-400">No jobs found. Try adjusting filters.</div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                {paginated.map((job) => (
                  <JobCard key={job.id || job._id} job={job} 
                  onApply={async () => {
                    try {
                      await applyJob(job._id);

                      addToast("Application submitted!", "success");

                      console.log("Applied Successfully");
                    } catch (err) {
                      console.error(err);

                      addToast(
                        err.response?.data?.message || "Failed to apply",
                        "error"
                      );
                    }
                  }}
                   onSave={() => addToast("Job saved!", "success")} />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i} onClick={() => setPage(i + 1)} className={`px-3 py-1.5 rounded-lg text-sm ${page === i + 1 ? "bg-accent text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}>
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobsPage;
