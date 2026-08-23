import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X, SlidersHorizontal, SearchX } from "lucide-react";
import JobCard from "../../components/job/JobCard.jsx";
import FilterPanel from "../../components/job/FilterPanel.jsx";
import JobCardSkeleton from "../../components/job/JobCardSkeleton.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import Button from "../../components/common/Button.jsx";
import useJobStore from "../../store/jobStore.js";
import useUIStore from "../../store/uiStore.js";
import { applyJob } from "../../services/applicationService.js";
import { getErrorMessage } from "../../utils/errorHandler.js";

const defaultFilters = {
  search: "",
  jobTypes: [],
  experienceLevels: [],
  category: "",
  salary: 0,
  sortBy: "relevance",
};

const getJobExperience = (job) => {
  if (job.experienceLevel) return job.experienceLevel.toLowerCase();
  
  // Infer from title/description
  const title = (job.title || "").toLowerCase();
  const desc = (job.description || "").toLowerCase();
  if (
    title.includes("intern") ||
    title.includes("fresher") ||
    desc.includes("no experience") ||
    desc.includes("fresh graduate")
  ) {
    return "fresher";
  }
  if (
    title.includes("senior") ||
    title.includes("lead") ||
    title.includes("architect") ||
    title.includes("principal") ||
    desc.includes("5+ years") ||
    desc.includes("3+ years")
  ) {
    return "3+ years";
  }
  if (desc.includes("1 year") || desc.includes("0-1 year") || desc.includes("junior")) {
    return "0-1 years";
  }
  return "1-3 years";
};

const parseSalaryToLpa = (job) => {
  let salaryStr = job.salary || "";
  if (!salaryStr && job.stipend) {
    if (job.stipend < 100) return job.stipend;
    return (job.stipend * 12) / 100000;
  }
  if (!salaryStr) return 0;

  const clean = salaryStr.replace(/[^\d.-]/g, "");
  if (salaryStr.toLowerCase().includes("lpa")) {
    if (clean.includes("-")) {
      const parts = clean.split("-");
      const min = parseFloat(parts[0]);
      const max = parseFloat(parts[1]);
      return (min + max) / 2;
    }
    return parseFloat(clean) || 0;
  }

  if (salaryStr.toLowerCase().includes("month") || salaryStr.toLowerCase().includes("k")) {
    let val = 0;
    if (clean.includes("-")) {
      const parts = clean.split("-");
      const min = parseFloat(parts[0]);
      const max = parseFloat(parts[1]);
      val = (min + max) / 2;
    } else {
      val = parseFloat(clean) || 0;
    }
    if (val < 1000) {
      val = val * 1000;
    }
    return (val * 12) / 100000;
  }

  return parseFloat(clean) || 0;
};

function JobsPage() {
  const { jobs, loading, applications, fetchJobs, fetchApplications } = useJobStore();
  const [searchParams] = useSearchParams();

  const success = useUIStore((s) => s.success);
  const errorToast = useUIStore((s) => s.error);

  const [filters, setFilters] = useState(defaultFilters);
  const [page, setPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const perPage = 6;

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, [fetchJobs, fetchApplications]);

  useEffect(() => {
    const q = searchParams.get("search");
    if (q) {
      setFilters((prev) => ({ ...prev, search: q }));
      setPage(1);
    }
  }, [searchParams]);

  const appliedJobs = useMemo(() => {
    return new Set(
      (applications || [])
        .filter((app) => app.jobId)
        .map((app) => app.jobId._id || app.jobId.id)
    );
  }, [applications]);

  const filtered = useMemo(() => {
    let result = [...jobs];

    // Search query match (title, company, skills)
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          (job.skills || []).some((s) => s.toLowerCase().includes(q))
      );
    }

    // Category mapping & match
    if (filters.category) {
      result = result.filter((job) => {
        const title = (job.title || "").toLowerCase();
        const skills = (job.skills || []).map((s) => s.toLowerCase());

        if (filters.category === "frontend") {
          return (
            title.includes("frontend") ||
            title.includes("react") ||
            title.includes("ui") ||
            skills.includes("react") ||
            skills.includes("javascript") ||
            skills.includes("css") ||
            skills.includes("html") ||
            skills.includes("tailwind")
          );
        }
        if (filters.category === "backend") {
          return (
            title.includes("backend") ||
            title.includes("node") ||
            title.includes("java") ||
            title.includes("spring") ||
            title.includes("python") ||
            title.includes("django") ||
            title.includes("sql") ||
            skills.includes("node.js") ||
            skills.includes("express") ||
            skills.includes("mongodb") ||
            skills.includes("java") ||
            skills.includes("python")
          );
        }
        if (filters.category === "fullstack") {
          return (
            title.includes("full stack") ||
            title.includes("fullstack") ||
            (title.includes("developer") && skills.includes("react") && skills.includes("node.js"))
          );
        }
        if (filters.category === "devops") {
          return (
            title.includes("devops") ||
            title.includes("cloud") ||
            title.includes("infra") ||
            skills.includes("docker") ||
            skills.includes("kubernetes") ||
            skills.includes("aws") ||
            skills.includes("terraform")
          );
        }
        if (filters.category === "design") {
          return (
            title.includes("design") ||
            title.includes("ux") ||
            title.includes("ui") ||
            skills.includes("figma") ||
            skills.includes("ui design") ||
            skills.includes("photoshop")
          );
        }
        if (filters.category === "data-ai") {
          return (
            title.includes("data") ||
            title.includes("analyst") ||
            title.includes("learning") ||
            title.includes("ml") ||
            title.includes("ai") ||
            skills.includes("python") ||
            skills.includes("tensorflow") ||
            skills.includes("pytorch") ||
            skills.includes("sql") ||
            skills.includes("pandas")
          );
        }
        return true;
      });
    }

    // Job Type match (multi-select)
    if (filters.jobTypes && filters.jobTypes.length > 0) {
      result = result.filter((job) => {
        const jt = job.jobType || job.type || "";
        const normalized = jt.toLowerCase().replace(/[^a-z]/g, "");
        return filters.jobTypes.includes(normalized);
      });
    }

    // Experience level match (multi-select)
    if (filters.experienceLevels && filters.experienceLevels.length > 0) {
      result = result.filter((job) => {
        const jobExp = getJobExperience(job);
        return filters.experienceLevels.includes(jobExp);
      });
    }

    // Min Salary check
    if (filters.salary && filters.salary > 0) {
      result = result.filter((job) => {
        const lpa = parseSalaryToLpa(job);
        return lpa >= filters.salary;
      });
    }

    // Sort mappings
    if (filters.sortBy === "match") {
      result.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    } else if (filters.sortBy === "newest") {
      result.sort((a, b) => new Date(b.postedAt || b.createdAt || 0) - new Date(a.postedAt || a.createdAt || 0));
    } else if (filters.sortBy === "salary-high") {
      result.sort((a, b) => parseSalaryToLpa(b) - parseSalaryToLpa(a));
    } else if (filters.sortBy === "salary-low") {
      result.sort((a, b) => parseSalaryToLpa(a) - parseSalaryToLpa(b));
    }

    return result;
  }, [jobs, filters]);

  const paginated = useMemo(() => {
    return filtered.slice((page - 1) * perPage, page * perPage);
  }, [filtered, page, perPage]);

  const totalPages = Math.ceil(filtered.length / perPage);

  const handleApply = async (jobId) => {
    try {
      await applyJob(jobId);
      success("Application submitted successfully!");
      fetchApplications();
    } catch (err) {
      errorToast(getErrorMessage(err));
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      {/* Search Header Banner */}
      <div
        className="relative rounded-2xl p-6 md:p-8 mb-8 overflow-hidden border border-white/5 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6"
        style={{
          background: "linear-gradient(135deg, rgba(26, 31, 43, 0.9) 0%, rgba(20, 24, 32, 0.95) 100%)",
        }}
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="flex-1 max-w-xl">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Explore Opportunities
          </h1>
          <p className="text-gray-400 text-sm mt-1.5 leading-relaxed">
            Find the perfect matching job powered by AI. Search by titles, skills, or company names.
          </p>
        </div>

        <div className="flex-1 w-full max-w-md">
          <div className="relative">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              type="text"
              placeholder="Search job title, company, or skills..."
              value={filters.search || ""}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, search: e.target.value }));
                setPage(1);
              }}
              className="focus-ring w-full rounded-xl py-3 pl-11 pr-24 text-sm transition-all duration-200"
              style={{
                background: "var(--bg-input)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-color)",
              }}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              {filters.search && (
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, search: "" }))}
                  className="p-1 rounded-md text-gray-500 hover:text-gray-300 hover:bg-white/5 cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
              <span className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-accent/25 text-accent-light border border-accent/20">
                AI Search
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 items-start">
        {/* Sidebar for Desktop */}
        <div className="hidden lg:block lg:col-span-1">
          <FilterPanel
            filters={filters}
            onFilterChange={(newFilters) => {
              setFilters(newFilters);
              setPage(1);
            }}
            onReset={() => {
              setFilters(defaultFilters);
              setPage(1);
            }}
          />
        </div>

        {/* Jobs list and stats */}
        <div className="lg:col-span-3">
          {/* Mobile Filter Trigger & Stats */}
          <div
            className="flex lg:hidden items-center justify-between gap-3 mb-4 p-3 rounded-xl border border-white/5"
            style={{ background: "var(--bg-card)" }}
          >
            <span className="text-xs font-semibold text-gray-400">
              Found {filtered.length} jobs
            </span>
            <button
              onClick={() => setShowMobileFilters(true)}
              className="focus-ring flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-accent hover:brightness-110 cursor-pointer"
            >
              <SlidersHorizontal size={14} />
              Filter & Sort
            </button>
          </div>

          {/* Desktop stats line */}
          <div className="hidden lg:flex items-center justify-between mb-4 px-1 text-sm text-gray-400">
            <span>
              Showing {(page - 1) * perPage + 1}-{Math.min(page * perPage, filtered.length)} of{" "}
              {filtered.length} jobs
            </span>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 gap-4">
              {Array.from({ length: perPage }).map((_, index) => (
                <JobCardSkeleton key={index} />
              ))}
            </div>
          ) : paginated.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title="No jobs matches your criteria"
              description="We couldn't find any jobs matching your current filters. Try resetting them or search with a different keyword."
              action={
                <Button onClick={() => setFilters(defaultFilters)}>
                  Reset Filters
                </Button>
              }
            />
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                {paginated.map((job) => (
                  <JobCard
                    key={job._id || job.id}
                    job={job}
                    applied={appliedJobs.has(job._id || job.id)}
                    onApply={() => handleApply(job._id || job.id)}
                    onSave={() => success("Job bookmarked successfully!")}
                  />
                ))}
              </div>

              {/* Pagination component */}
              <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowMobileFilters(false)}
          />
          {/* Drawer content */}
          <div
            className="relative w-full max-w-sm h-full flex flex-col shadow-2xl p-6 overflow-y-auto"
            style={{ background: "var(--bg-main)" }}
          >
            <div
              className="flex items-center justify-between mb-5 pb-3 border-b"
              style={{ borderColor: "var(--border-color)" }}
            >
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-accent" />
                Filters
              </h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <FilterPanel
              filters={filters}
              onFilterChange={(newFilters) => {
                setFilters(newFilters);
                setPage(1);
              }}
              onReset={() => {
                setFilters(defaultFilters);
                setPage(1);
              }}
              className="!static !shadow-none !p-0"
            />

            <div
              className="mt-8 pt-4 border-t"
              style={{ borderColor: "var(--border-color)" }}
            >
              <Button className="w-full font-semibold" onClick={() => setShowMobileFilters(false)}>
                Show {filtered.length} Jobs
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobsPage;