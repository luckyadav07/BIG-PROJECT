import {
  FileText,
  Code2,
  FolderGit2,
  GraduationCap,
  Briefcase,
  Sparkles,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";
import Card from "../common/Card.jsx";

function AnalysisSummary({ resume, analysis }) {
  // ATS Score calculation based on strengths, weaknesses, and missing skills
  const strengthsCount = analysis?.strengths?.length || 0;
  const weaknessesCount = analysis?.weaknesses?.length || 0;
  const missingCount = analysis?.missingSkills?.length || 0;

  let score = 75; // base score
  score += Math.min(strengthsCount * 3, 15);
  score -= Math.min(weaknessesCount * 4, 20);
  score -= Math.min(missingCount * 3, 15);
  score = Math.max(35, Math.min(98, score)); // Clamp between 35 and 98

  // Radial SVG properties
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColorClass = (val) => {
    if (val >= 80) return "stroke-success text-success";
    if (val >= 60) return "stroke-warning text-warning";
    return "stroke-danger text-danger";
  };

  const getScoreBgClass = (val) => {
    if (val >= 80) return "bg-success/5 border-success/10 text-success";
    if (val >= 60) return "bg-warning/5 border-warning/10 text-warning";
    return "bg-danger/5 border-danger/10 text-danger";
  };

  const stats = [
    {
      title: "Extracted Skills",
      value: resume?.skills?.length ?? 0,
      icon: Code2,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      title: "Projects Listed",
      value: resume?.projects?.length ?? 0,
      icon: FolderGit2,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      title: "Education Blocks",
      value: resume?.education
        ? Array.isArray(resume.education)
          ? resume.education.length
          : 1
        : 0,
      icon: GraduationCap,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Certifications",
      value: resume?.certifications?.length ?? 0,
      icon: Award,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* ATS Score Visualization Card */}
      <Card className="lg:col-span-1 border border-white/5 flex flex-col md:flex-row items-center justify-center p-6 gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-44 h-44 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        {/* Circular Progress Gauge */}
        <div className="relative flex items-center justify-center h-32 w-32 shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background ring */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              className="stroke-white/5"
              strokeWidth="9"
              fill="transparent"
            />
            {/* Foreground progress ring */}
            <motion.circle
              cx="64"
              cy="64"
              r={radius}
              className={`${getScoreColorClass(score)}`}
              strokeWidth="9"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold text-white tracking-tight">{score}</span>
            <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">ATS Score</span>
          </div>
        </div>

        {/* ATS Score Details */}
        <div className="text-center md:text-left space-y-2">
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getScoreBgClass(score)}`}>
            {score >= 80 ? "ATS Ready" : score >= 60 ? "Needs Polish" : "Weak Match"}
          </span>
          <h3 className="text-base font-bold text-white leading-tight">
            ATS Compatibility Rating
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed max-w-[200px]">
            Calculated based on standard parser rules, resume completeness, and skill matches.
          </p>
        </div>
      </Card>

      {/* Structural Stats Cards */}
      <div className="lg:col-span-2 grid grid-cols-2 gap-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.title}
              className="!p-5 border border-white/5 hover:border-white/10 transition-all duration-200"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p
                    className="text-xs font-semibold text-gray-500 uppercase tracking-wider truncate"
                  >
                    {item.title}
                  </p>
                  <h3
                    className="text-2xl font-black text-white mt-1.5 leading-none"
                  >
                    {item.value}
                  </h3>
                </div>
                
                <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center border ${item.color}`}>
                  <Icon size={18} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default AnalysisSummary;