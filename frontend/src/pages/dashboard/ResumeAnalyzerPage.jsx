import { useEffect, useMemo } from "react";
import { Sparkles, FileDown, Copy, Printer, BarChart3, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import ResumeUploadCard from "../../components/resume/ResumeUploadCard.jsx";
import AnalysisSummary from "../../components/resume/AnalysisSummary.jsx";
import StrengthCard from "../../components/resume/StrengthCard.jsx";
import WeaknessCard from "../../components/resume/WeaknessCard.jsx";
import MissingSkillsCard from "../../components/resume/MissingSkillsCard.jsx";
import SuggestionsCard from "../../components/resume/SuggestionsCard.jsx";
import LoadingAnalyzer from "../../components/resume/LoadingAnalyzer.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import Button from "../../components/common/Button.jsx";
import Card from "../../components/common/Card.jsx";

import useResumeStore from "../../store/resumeStore.js";
import useUIStore from "../../store/uiStore.js";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

function ResumeAnalyzerPage() {
  const analysis = useResumeStore((s) => s.analysis);
  const resumeData = useResumeStore((s) => s.resumeData);
  const uploading = useResumeStore((s) => s.uploading);
  const analyzing = useResumeStore((s) => s.analyzing);
  const error = useResumeStore((s) => s.error);
  
  const fetchLatestAnalysis = useResumeStore((s) => s.fetchLatestAnalysis);
  const uploadResumeFile = useResumeStore((s) => s.uploadResumeFile);
  const analyzeResumeFile = useResumeStore((s) => s.analyzeResumeFile);
  const clearError = useResumeStore((s) => s.clearError);
  
  const showToast = useUIStore((s) => s.showToast);

  useEffect(() => {
    fetchLatestAnalysis();
  }, [fetchLatestAnalysis]);

  useEffect(() => {
    if (!error) return;
    showToast({ message: error, type: "error" });
    clearError();
  }, [error, clearError, showToast]);

  const handleAnalyze = async () => {
    if (uploading || analyzing) return;
    try {
      await uploadResumeFile();
      await analyzeResumeFile();
      showToast({ message: "Resume analyzed successfully!", type: "success" });
    } catch {
      // Handled by store
    }
  };

  const handleCopyReport = () => {
    if (!analysis) return;
    const md = `
# AI Resume Audit & ATS Report
**Professional Summary:** ${analysis.professionalSummary || "N/A"}

## Key Strengths
${(analysis.strengths || []).map((s) => `- ${s}`).join("\n")}

## Areas of Improvement
${(analysis.weaknesses || []).map((w) => `- ${w}`).join("\n")}

## ATS Skills Gap (Missing Skills)
${(analysis.missingSkills || []).map((s) => `- ${s}`).join("\n")}

## Actionable Recommendations
${(analysis.improvements || []).map((i) => `- ${i}`).join("\n")}
    `;
    navigator.clipboard.writeText(md.trim());
    showToast({ message: "Analysis report copied as Markdown!", type: "success" });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Premium Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4" style={{ borderColor: "var(--border-color)" }}>
        <div>
          <h1
            className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2.5 tracking-tight"
          >
            <Sparkles className="text-accent" />
            Resume Analyzer
          </h1>
          <p
            className="text-sm text-gray-400 mt-1.5 leading-relaxed"
          >
            Instant ATS compatibility audit, automated skill gap mapping, and project recommendations.
          </p>
        </div>
      </div>

      {/* Upload Zone Card */}
      <ResumeUploadCard onAnalyze={handleAnalyze} />

      {/* Loader */}
      {(uploading || analyzing) && <LoadingAnalyzer />}

      {/* Analysis Output */}
      {analysis && !uploading && !analyzing ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {/* Section 1: Score & Metrics Summary */}
          <motion.div variants={itemVariants}>
            <AnalysisSummary resume={resumeData} analysis={analysis} />
          </motion.div>

          {/* AI Summary Highlight */}
          {analysis.professionalSummary && (
            <motion.div variants={itemVariants}>
              <Card className="border border-white/5 bg-accent/5 p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-accent mb-2.5 flex items-center gap-1.5">
                  <Sparkles size={14} />
                  AI Summary Assessment
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed font-semibold italic">
                  "{analysis.professionalSummary}"
                </p>
              </Card>
            </motion.div>
          )}

          {/* Section 2: Strengths & Weaknesses Grids */}
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div variants={itemVariants}>
              <StrengthCard strengths={analysis.strengths} />
            </motion.div>

            <motion.div variants={itemVariants}>
              <WeaknessCard weaknesses={analysis.weaknesses} />
            </motion.div>
          </div>

          {/* Section 3: Skill Gaps */}
          <motion.div variants={itemVariants}>
            <MissingSkillsCard skills={analysis.missingSkills} />
          </motion.div>

          {/* Section 4: Recommendations Suggestions */}
          <motion.div variants={itemVariants}>
            <SuggestionsCard suggestions={analysis.improvements} />
          </motion.div>

          {/* Section 5: Export / Actions */}
          <motion.div variants={itemVariants}>
            <Card className="border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 p-5">
              <div className="text-center sm:text-left">
                <h3 className="text-sm font-bold text-white leading-tight">
                  Export Feedback Report
                </h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  Share, copy, or print this audit dashboard for reference or career coach reviews.
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  onClick={handleCopyReport}
                  className="flex-1 sm:flex-none py-2.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5"
                >
                  <Copy size={13} />
                  Copy Report
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => window.print()}
                  className="flex-1 sm:flex-none py-2.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5"
                >
                  <Printer size={13} />
                  Print PDF
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      ) : (
        !uploading &&
        !analyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <EmptyState
              icon={Sparkles}
              title="Audit Dashboard Inactive"
              description="Upload your latest resume above and trigger the audit engine to populate ATS formatting checklists and skills coverage diagrams."
              action={
                <Button
                  onClick={() => document.getElementById("resume-upload").click()}
                  className="font-semibold text-xs py-2 px-5 rounded-lg flex items-center gap-2"
                >
                  Choose Resume File
                </Button>
              }
            />
          </motion.div>
        )
      )}
    </div>
  );
}

export default ResumeAnalyzerPage;