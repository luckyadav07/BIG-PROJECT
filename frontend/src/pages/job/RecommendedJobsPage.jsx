import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Clock, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import JobCard from "../../components/job/JobCard.jsx";
import JobCardSkeleton from "../../components/job/JobCardSkeleton.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import Button from "../../components/common/Button.jsx";
import useJobStore from "../../store/jobStore.js";
import useUIStore from "../../store/uiStore.js";
import { applyJob } from "../../services/applicationService.js";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

function RecommendedJobsPage() {
  const { recommendedJobs, loading, applications, fetchRecommended, fetchApplications } = useJobStore();
  const showToast = useUIStore((s) => s.showToast);
  const [sortBy, setSortBy] = useState("match");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchRecommended();
    fetchApplications();
  }, [fetchRecommended, fetchApplications]);

  const appliedJobs = useMemo(() => {
    return new Set(
      (applications || [])
        .filter((app) => app.jobId)
        .map((app) => app.jobId._id || app.jobId.id)
    );
  }, [applications]);

  const sorted = useMemo(() => {
    return [...recommendedJobs].sort((a, b) => {
      if (sortBy === "match") return (b.matchScore || 0) - (a.matchScore || 0);
      if (sortBy === "newest") {
        return new Date(b.postedAt || b.createdAt || 0) - new Date(a.postedAt || a.createdAt || 0);
      }
      return 0;
    });
  }, [recommendedJobs, sortBy]);

  const handleApply = async (job) => {
    try {
      const jobId = job._id || job.id;
      await applyJob(jobId);
      showToast({ message: "Application submitted!", type: "success" });
      await fetchApplications();
      await fetchRecommended();
    } catch (err) {
      showToast({ message: err.response?.data?.message || "Failed to apply", type: "error" });
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">
      {/* Premium AI Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative rounded-2xl p-6 md:p-8 mb-8 overflow-hidden border shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6"
        style={{
          background: "var(--bg-card)",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="flex-1 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/25 text-accent-light text-xs font-semibold mb-3">
            <Sparkles size={12} />
            AI Curation Engine Active
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Personalized Recommendations
          </h1>
          <p className="text-sm mt-1.5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            These jobs are matched dynamically based on your uploaded resume, professional skills, and historical preference analytics.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
          <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>Sort matches by:</span>
          
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-xl border px-3.5 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer flex items-center gap-2 select-none"
              style={{ background: "var(--bg-elevated)", borderColor: "var(--border-color)", color: "var(--text-primary)" }}
            >
              {sortBy === "match" ? (
                <span className="flex items-center gap-1.5 text-accent-light">
                  <Sparkles size={12} />
                  Match Score
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Clock size={12} />
                  Date Posted
                </span>
              )}
              <ChevronDown size={14} style={{ color: "var(--text-secondary)" }} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.12 }}
                    className="absolute right-0 mt-2 w-48 rounded-2xl border p-1.5 shadow-2xl z-50 overflow-hidden flex flex-col gap-1 backdrop-blur-md"
                    style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}
                  >
                    <button
                      onClick={() => {
                        setSortBy("match");
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer select-none ${
                        sortBy === "match" 
                          ? "bg-accent/10 text-accent-light" 
                          : "hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                      style={{ color: sortBy === "match" ? "var(--color-accent-light)" : "var(--text-primary)" }}
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles size={12} className={sortBy === "match" ? "text-accent-light" : "text-gray-400"} />
                        Match Score
                      </span>
                      {sortBy === "match" && <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />}
                    </button>

                    <button
                      onClick={() => {
                        setSortBy("newest");
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer select-none ${
                        sortBy === "newest" 
                          ? "bg-accent/10 text-accent-light" 
                          : "hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                      style={{ color: sortBy === "newest" ? "var(--color-accent-light)" : "var(--text-primary)" }}
                    >
                      <span className="flex items-center gap-2">
                        <Clock size={12} className={sortBy === "newest" ? "text-accent-light" : "text-gray-400"} />
                        Date Posted
                      </span>
                      {sortBy === "newest" && <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />}
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Main Grid Content */}
      {loading ? (
        <div className="grid md:grid-cols-2 gap-4 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <EmptyState
            icon={Sparkles}
            title="No AI Recommendations Yet"
            description="We haven't parsed your profile details or resume skills yet. Analyze your resume or update your profile to unlock personalized job recommendations!"
            action={
              <Link to="/resume-analyzer">
                <Button className="font-semibold flex items-center gap-2">
                  Analyze Resume
                  <ArrowRight size={16} />
                </Button>
              </Link>
            }
          />
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 gap-4"
        >
          {sorted.map((job) => (
            <motion.div key={job.id || job._id} variants={itemVariants}>
              <JobCard
                job={job}
                applied={appliedJobs.has(job._id || job.id)}
                showMatchReason={true}
                onApply={handleApply}
                onSave={() => showToast({ message: "Job bookmarked successfully!", type: "success" })}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default RecommendedJobsPage;
