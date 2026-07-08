import { useEffect } from "react";

import ResumeUploadCard from "../../components/resume/ResumeUploadCard.jsx";
import AnalysisSummary from "../../components/resume/AnalysisSummary.jsx";
import StrengthCard from "../../components/resume/StrengthCard.jsx";
import WeaknessCard from "../../components/resume/WeaknessCard.jsx";
import MissingSkillsCard from "../../components/resume/MissingSkillsCard.jsx";
import SuggestionsCard from "../../components/resume/SuggestionsCard.jsx";
import LoadingAnalyzer from "../../components/resume/LoadingAnalyzer.jsx";

import useResumeStore from "../../store/resumeStore.js";
import useUIStore from "../../store/uiStore.js";

function ResumeAnalyzerPage() {
  const analysis = useResumeStore((s) => s.analysis);
  const resumeData = useResumeStore((s) => s.resumeData);

  const uploading = useResumeStore((s) => s.uploading);
  const analyzing = useResumeStore((s) => s.analyzing);

  const error = useResumeStore((s) => s.error);

  const fetchLatestAnalysis = useResumeStore(
    (s) => s.fetchLatestAnalysis
  );

  const uploadResumeFile = useResumeStore(
    (s) => s.uploadResumeFile
  );

  const analyzeResumeFile = useResumeStore(
    (s) => s.analyzeResumeFile
  );

  const clearError = useResumeStore(
    (s) => s.clearError
  );

  const showToast = useUIStore((s) => s.showToast);

  useEffect(() => {
    fetchLatestAnalysis();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!error) return;

    showToast({
      message: error,
      type: "error",
    });

    clearError();
  }, [error, clearError, showToast]);

  const handleAnalyze = async () => {
    if (uploading || analyzing) return;

    try {
      await uploadResumeFile();

      await analyzeResumeFile();

      showToast({
        message: "Resume analyzed successfully!",
        type: "success",
      });
    } catch {
      // Error handled by store
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1
          className="text-3xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Resume Analyzer
        </h1>

        <p
          className="mt-2"
          style={{ color: "var(--text-secondary)" }}
        >
          Upload your resume and receive AI-powered feedback to improve your
          chances of getting hired.
        </p>
      </div>

      <ResumeUploadCard onAnalyze={handleAnalyze} />

      {(uploading || analyzing) && <LoadingAnalyzer />}

      {analysis ? (
        <div className="space-y-6">
          <AnalysisSummary resume={resumeData} />

          <div className="grid gap-6 lg:grid-cols-2">
            <StrengthCard strengths={analysis.strengths} />

            <WeaknessCard weaknesses={analysis.weaknesses} />
          </div>

          <MissingSkillsCard
            skills={analysis.missingSkills}
          />

          <SuggestionsCard
            suggestions={analysis.improvements}
          />
        </div>
      ) : (
        !uploading &&
        !analyzing && (
          <div
            className="rounded-2xl border p-10 text-center"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border-color)",
            }}
          >
            <h2
              className="text-xl font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              No Resume Analysis Yet
            </h2>

            <p
              className="mt-3"
              style={{ color: "var(--text-secondary)" }}
            >
              Upload your resume and click{" "}
              <strong>Analyze Resume</strong> to receive AI-powered feedback.
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default ResumeAnalyzerPage;