import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Bookmark, Briefcase, DollarSign, Calendar, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Card from "../common/Card.jsx";
import Badge from "../common/Badge.jsx";
import Button from "../common/Button.jsx";
import { getInitials, formatRelativeTime } from "../../utils/formatters.js";

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

function JobCard({
  job,
  onApply,
  onSave,
  applied = false,
  showMatchScore = true,
  showMatchReason = false,
}) {
  const id = job.id || job._id;
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked(!bookmarked);
    if (onSave) {
      onSave(job);
    }
  };

  const jobTypeLabel = JOB_TYPE_LABELS[job.jobType] || job.jobType || JOB_TYPE_LABELS[job.type] || job.type || "Full-time";

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="h-full"
    >
      <Card
        hover
        variant={job.matchScore >= 85 ? "ai" : "default"}
        className={`flex flex-col h-full !p-5 relative transition-all duration-300 border border-white/5 hover:border-accent/30 hover:shadow-lg ${
          job.matchScore >= 85 ? "shadow-[0_0_12px_rgba(99,102,241,0.05)]" : ""
        }`}
      >
        {/* Top Section: Logo & Details */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-base font-extrabold text-white shadow-inner"
            style={getLogoStyle(job.company)}
          >
            {getInitials(job.company)}
          </div>

          <div className="flex-1 min-w-0">
            <Link
              to={`/jobs/${id}`}
              className="text-base font-semibold hover:text-accent transition duration-200 line-clamp-1 block"
              style={{ color: "var(--text-primary)" }}
            >
              {job.title}
            </Link>
            <p
              className="text-sm font-medium mt-0.5"
              style={{ color: "var(--text-secondary)" }}
            >
              {job.company}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {showMatchScore && job.matchScore && (
              <Badge
                variant={job.matchScore >= 85 ? "purple" : "info"}
                className="flex items-center gap-1 shrink-0"
              >
                {job.matchScore >= 85 && <Sparkles size={10} className="text-white" />}
                {job.matchScore}% Match
              </Badge>
            )}
            <button
              onClick={handleBookmark}
              className={`focus-ring p-2 rounded-xl transition duration-200 cursor-pointer ${
                bookmarked
                  ? "bg-accent/10 text-accent"
                  : "bg-white/5 hover:bg-white/10 text-gray-400 hover:text-gray-200"
              }`}
              title={bookmarked ? "Bookmarked" : "Bookmark Job"}
              aria-label={bookmarked ? "Bookmarked" : "Bookmark Job"}
            >
              <Bookmark size={16} fill={bookmarked ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        {/* Middle Section: Meta Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
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

        {/* Match Reason (AI matching feedback) */}
        {showMatchReason && job.matchingSkills && job.matchingSkills.length > 0 && (
          <p
            className="text-xs mb-4 leading-relaxed p-2.5 rounded-lg border border-accent/10 bg-accent/5"
            style={{ color: "var(--text-secondary)" }}
          >
            <strong className="text-accent">AI Analysis:</strong> Matches your skills in{" "}
            {job.matchingSkills.join(", ")}
          </p>
        )}

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
          {(job.skills || []).slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="rounded-lg px-2.5 py-1 text-xs font-medium border border-white/5 transition hover:bg-white/10"
              style={{
                background: "var(--glass-bg)",
                color: "var(--text-secondary)",
              }}
            >
              {skill}
            </span>
          ))}
          {(job.skills || []).length > 4 && (
            <span
              className="rounded-lg px-2 py-1 text-xs font-medium text-gray-500 bg-white/5 border border-white/5"
            >
              +{job.skills.length - 4} more
            </span>
          )}
        </div>

        {/* Bottom Section: Footer Actions */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t" style={{ borderColor: "var(--border-color)" }}>
          <span
            className="text-xs flex items-center gap-1.5 font-medium"
            style={{ color: "var(--text-muted)" }}
          >
            <Calendar size={12} />
            {job.postedAt ? formatRelativeTime(job.postedAt) : "Recently"}
          </span>

          <Button
            size="sm"
            className={`min-w-[100px] font-semibold text-xs py-2 px-4 shadow-sm rounded-lg ${
              applied
                ? "bg-green-600/20 text-green-400 border border-green-500/30 hover:bg-green-600/20 cursor-default"
                : ""
            }`}
            disabled={applied}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onApply) onApply(job);
            }}
          >
            {applied ? "✓ Applied" : "Apply Now"}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

export default JobCard;
