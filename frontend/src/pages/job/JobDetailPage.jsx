import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Clock,
  Share2,
  Bookmark,
  Briefcase,
  DollarSign,
  Calendar,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  SearchX,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import api from "../../services/api.js";
import { applyJob } from "../../services/applicationService.js";
import { MOCK_JOBS } from "../../utils/mockData.js";
import { getInitials, formatRelativeTime } from "../../utils/formatters.js";
import Card from "../../components/common/Card.jsx";
import Badge from "../../components/common/Badge.jsx";
import Button from "../../components/common/Button.jsx";
import Skeleton from "../../components/common/Skeleton.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import useUIStore from "../../store/uiStore.js";
import useJobStore from "../../store/jobStore.js";

const JOB_TYPE_LABELS = {
  fulltime: "Full-time",
  internship: "Internship",
  remote: "Remote",
  contract: "Contract",
};

const getLogoStyle = (companyName) => {
  if (!companyName) return { background: "linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-dark) 100%)" };
  let hash = 0;
  for (let i = 0; i < companyName.length; i++) {
    hash = companyName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h1 = Math.abs(hash % 360);
  const h2 = (h1 + 45) % 360;
  return {
    background: `linear-gradient(135deg, hsl(${h1}, 75%, 60%) 0%, hsl(${h2}, 80%, 40%) 100%)`,
    textShadow: "0 1px 2px rgba(0,0,0,0.2)",
  };
};

const fadeInUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const showToast = useUIStore((s) => s.showToast);
  const { jobs, fetchJobs, applications, fetchApplications } = useJobStore();

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, [fetchJobs, fetchApplications]);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data.data || res.data);
      } catch {
        setJob(MOCK_JOBS.find((j) => j.id === id || j._id === id) || MOCK_JOBS[0]);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const applied = useMemo(() => {
    return (applications || [])
      .filter((app) => app.jobId)
      .some((app) => (app.jobId._id || app.jobId.id) === (job?._id || job?.id));
  }, [applications, job]);

  const similarJobs = useMemo(() => {
    if (!job || !jobs || jobs.length === 0) return [];
    
    const currentId = job._id || job.id;
    const currentSkills = new Set((job.skills || []).map((s) => s.toLowerCase()));
    
    return jobs
      .filter((j) => (j._id || j.id) !== currentId)
      .map((j) => {
        const overlap = (j.skills || []).filter((s) => currentSkills.has(s.toLowerCase())).length;
        return { ...j, overlap };
      })
      .sort((a, b) => b.overlap - a.overlap)
      .slice(0, 3);
  }, [job, jobs]);

  const handleApply = async () => {
    try {
      setApplying(true);
      await applyJob(job._id || job.id);
      showToast({ message: "Application submitted successfully!", type: "success" });
      fetchApplications();
    } catch (err) {
      const message = err.response?.data?.message || "Failed to apply";
      showToast({ message, type: "error" });
    } finally {
      setApplying(false);
    }
  };

  const handleSave = () => {
    setSaved(!saved);
    showToast({
      message: saved ? "Job removed from bookmarks!" : "Job saved successfully!",
      type: "success",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast({ message: "Job link copied to clipboard!", type: "success" });
  };

  const jobTypeLabel = job ? (JOB_TYPE_LABELS[job.jobType] || job.jobType || JOB_TYPE_LABELS[job.type] || job.type || "Full-time") : "";

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-pulse">
        <div className="h-4 w-32 bg-white/5 rounded-md" />

        <Card className="!p-6 md:!p-8 border border-white/5">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
            <Skeleton width="64px" height="64px" className="!rounded-2xl shrink-0" />
            <div className="flex-1 space-y-2.5 w-full">
              <Skeleton height="24px" width="50%" />
              <Skeleton height="16px" width="30%" />
              <div className="flex flex-wrap gap-2 pt-2">
                <Skeleton width="80px" height="24px" className="!rounded-full" />
                <Skeleton width="100px" height="24px" className="!rounded-full" />
                <Skeleton width="90px" height="24px" className="!rounded-full" />
              </div>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="space-y-4">
              <Skeleton height="20px" width="35%" />
              <Skeleton height="14px" width="100%" />
              <Skeleton height="14px" width="95%" />
              <Skeleton height="14px" width="80%" />
            </Card>

            <Card className="space-y-4">
              <Skeleton height="20px" width="30%" />
              <div className="flex flex-wrap gap-2">
                <Skeleton width="70px" height="28px" className="!rounded-lg" />
                <Skeleton width="90px" height="28px" className="!rounded-lg" />
                <Skeleton width="60px" height="28px" className="!rounded-lg" />
                <Skeleton width="80px" height="28px" className="!rounded-lg" />
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="space-y-4">
              <Skeleton height="36px" className="!rounded-lg" />
              <Skeleton height="36px" className="!rounded-lg" />
              <Skeleton height="36px" className="!rounded-lg" />
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-md mx-auto py-16">
        <EmptyState
          icon={SearchX}
          title="Job Listing Not Found"
          description="The job opening you are looking for might have been filled, removed, or the link is invalid."
          action={
            <Link to="/jobs">
              <Button className="font-semibold flex items-center gap-2">
                <ArrowLeft size={16} />
                Back to Browse Jobs
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-12 space-y-6">
      {/* Back Button */}
      <Link
        to="/jobs"
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition duration-200"
      >
        <ArrowLeft size={16} />
        Back to Jobs
      </Link>

      {/* Hero Banner Header with animation */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <Card
          className="relative overflow-hidden border border-white/5 shadow-md !p-6 md:!p-8"
          style={{
            background: "linear-gradient(135deg, rgba(26, 31, 43, 0.9) 0%, rgba(20, 24, 32, 0.95) 100%)",
          }}
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start md:items-center gap-5">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-xl font-extrabold text-white shadow-md"
                style={getLogoStyle(job.company)}
              >
                {getInitials(job.company)}
              </div>

              <div className="min-w-0">
                <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                  {job.title}
                </h1>
                <p className="text-base text-gray-300 font-medium mt-0.5">
                  {job.company}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="neutral" className="flex items-center gap-1.5 py-1">
                    <MapPin size={12} className="text-gray-400" />
                    <span className="text-xs">{job.location || "Remote"}</span>
                  </Badge>
                  
                  {jobTypeLabel && (
                    <Badge variant="info" className="flex items-center gap-1.5 py-1">
                      <Briefcase size={12} className="opacity-80" />
                      <span className="text-xs">{jobTypeLabel}</span>
                    </Badge>
                  )}

                  {job.experienceLevel && (
                    <Badge variant="warning" className="flex items-center gap-1.5 py-1">
                      <span className="text-xs font-semibold">Exp:</span>
                      <span className="text-xs">{job.experienceLevel}</span>
                    </Badge>
                  )}

                  {(job.salary || job.stipend) && (
                    <Badge variant="success" className="flex items-center gap-1.5 py-1">
                      <span className="text-xs font-semibold">₹</span>
                      <span className="text-xs">{job.salary || `${job.stipend} LPA`}</span>
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start md:self-center">
              {job.matchScore && (
                <div className="text-right shrink-0">
                  <Badge variant={job.matchScore >= 85 ? "purple" : "info"} className="flex items-center gap-1 py-1.5 font-bold">
                    <Sparkles size={11} />
                    {job.matchScore}% Skill Match
                  </Badge>
                  {job.postedAt && (
                    <p className="text-[10px] text-gray-500 mt-1.5 flex items-center justify-end gap-1 font-semibold">
                      <Clock size={10} />
                      Posted {formatRelativeTime(job.postedAt)}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Main Grid Section with staggered layout */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid lg:grid-cols-3 gap-6 items-start"
      >
        {/* Left Column: Job Description & Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Job Description Card */}
          <motion.div variants={fadeInUp}>
            <Card className="border border-white/5">
              <h2 className="text-base font-bold text-white mb-4 pb-2 border-b" style={{ borderColor: "var(--border-color)" }}>
                Job Description
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                {job.description || "No description provided for this role."}
              </p>
            </Card>
          </motion.div>

          {/* Required Skills Card */}
          <motion.div variants={fadeInUp}>
            <Card className="border border-white/5">
              <h2 className="text-base font-bold text-white mb-4 pb-2 border-b" style={{ borderColor: "var(--border-color)" }}>
                Required Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {(job.skills || []).map((s) => (
                  <span
                    key={s}
                    className="rounded-lg px-3 py-1.5 text-xs font-semibold border border-white/5 transition hover:bg-white/10"
                    style={{
                      background: "var(--glass-bg)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Requirements Card */}
          {job.requirements && job.requirements.length > 0 && (
            <motion.div variants={fadeInUp}>
              <Card className="border border-white/5">
                <h2 className="text-base font-bold text-white mb-4 pb-2 border-b" style={{ borderColor: "var(--border-color)" }}>
                  Key Requirements
                </h2>
                <ul className="space-y-3">
                  {job.requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          )}

          {/* Benefits Card */}
          {job.benefits && job.benefits.length > 0 && (
            <motion.div variants={fadeInUp}>
              <Card className="border border-white/5">
                <h2 className="text-base font-bold text-white mb-4 pb-2 border-b" style={{ borderColor: "var(--border-color)" }}>
                  Benefits & Perks
                </h2>
                <ul className="space-y-3">
                  {job.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <Sparkles size={16} className="text-accent shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Right Column: Sticky Apply Card & Similar Jobs */}
        <motion.div className="space-y-6" variants={fadeInUp}>
          {/* Sticky Apply card */}
          <Card className="sticky top-24 border border-white/5 flex flex-col gap-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Application Console
            </h2>

            <Button
              className={`w-full py-3 font-bold text-sm shadow-md rounded-xl ${
                applied
                  ? "bg-green-600 hover:bg-green-600 text-white cursor-default"
                  : ""
              }`}
              loading={applying}
              disabled={applying || applied}
              onClick={handleApply}
            >
              {applied ? "✓ Applied" : "Apply Now"}
            </Button>

            <div className="flex gap-2">
              <Button
                variant={saved ? "secondary" : "outline"}
                className="flex-1 py-2.5 font-semibold text-xs rounded-xl flex items-center justify-center gap-2"
                onClick={handleSave}
              >
                <Bookmark size={14} fill={saved ? "currentColor" : "none"} />
                {saved ? "Saved" : "Save Job"}
              </Button>

              <Button
                variant="secondary"
                className="flex-1 py-2.5 font-semibold text-xs rounded-xl flex items-center justify-center gap-2"
                onClick={handleShare}
              >
                <Share2 size={14} />
                Share
              </Button>
            </div>

            {job.jobUrl && (
              <a
                href={job.jobUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-accent hover:underline flex items-center justify-center gap-1.5 mt-2 transition"
              >
                <ExternalLink size={12} />
                Apply on Company Website
              </a>
            )}

            {/* Match Analysis detail */}
            <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--border-color)" }}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                <Sparkles size={14} className="text-accent" />
                AI Match Analysis
              </h3>
              
              {job.matchingSkills && job.matchingSkills.length > 0 ? (
                <div className="mb-3.5">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1.5">Matching skills</p>
                  <div className="flex flex-wrap gap-1">
                    {job.matchingSkills.map((s) => (
                      <Badge key={s} variant="success" className="text-[10px] px-2 py-0.5 font-semibold">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}

              {job.missingSkills && job.missingSkills.length > 0 ? (
                <div className="mb-4">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1.5">Skills to acquire</p>
                  <div className="flex flex-wrap gap-1">
                    {job.missingSkills.map((s) => (
                      <Badge key={s} variant="warning" className="text-[10px] px-2 py-0.5 font-semibold">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}

              <Link
                to="/career-coach"
                className="text-xs font-bold text-accent hover:text-accent-light hover:underline flex items-center gap-1.5"
              >
                <MessageCircle size={13} />
                Discuss prep path with AI coach →
              </Link>
            </div>
          </Card>

          {/* Similar Jobs Widget */}
          {similarJobs.length > 0 && (
            <div className="space-y-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 px-1">
                Similar Openings
              </h3>
              <div className="space-y-3">
                {similarJobs.map((simJob) => {
                  const simId = simJob._id || simJob.id;
                  return (
                    <Link
                      key={simId}
                      to={`/jobs/${simId}`}
                      className="block group"
                    >
                      <Card className="!p-4 border border-white/5 hover:border-accent/30 transition-all duration-200" hover>
                        <div className="flex items-start gap-3">
                          <div
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold text-white shadow-inner"
                            style={getLogoStyle(simJob.company)}
                          >
                            {getInitials(simJob.company)}
                          </div>
                          
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-semibold text-white group-hover:text-accent transition duration-150 truncate">
                              {simJob.title}
                            </h4>
                            <p className="text-xs text-gray-400 truncate mt-0.5">
                              {simJob.company} • {simJob.location || "Remote"}
                            </p>
                            
                            <div className="flex items-center justify-between mt-2.5">
                              {(simJob.salary || simJob.stipend) && (
                                <span className="text-xs text-success font-semibold">
                                  {simJob.salary ? `₹${simJob.salary}` : `₹${simJob.stipend} LPA`}
                                </span>
                              )}
                              {simJob.matchScore && (
                                <span className="text-[10px] font-bold text-accent px-1.5 py-0.5 rounded bg-accent/10 border border-accent/10">
                                  {simJob.matchScore}% match
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default JobDetailPage;
