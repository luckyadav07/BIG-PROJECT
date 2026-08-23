import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
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
        className="relative rounded-2xl p-6 md:p-8 mb-8 overflow-hidden ai-gradient-border border border-white/5 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6"
        style={{
          background: "linear-gradient(135deg, rgba(26, 31, 43, 0.95) 0%, rgba(20, 24, 32, 0.98) 100%)",
        }}
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="flex-1 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/25 text-accent-light text-xs font-semibold mb-3">
            <Sparkles size={12} />
            AI Curation Engine Active
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Personalized Recommendations
          </h1>
          <p className="text-gray-400 text-sm mt-1.5 leading-relaxed">
            These jobs are matched dynamically based on your uploaded resume, professional skills, and historical preference analytics.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
          <span className="text-xs font-semibold text-gray-400">Sort matches by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
            style={{ background: "var(--bg-elevated)" }}
          >
            <option value="match" className="bg-navy">Match Score</option>
            <option value="newest" className="bg-navy">Date Posted</option>
          </select>
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
