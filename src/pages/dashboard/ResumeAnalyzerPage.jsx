import { useState } from "react";

import ResumeUploadCard from "../../components/resume/ResumeUploadCard.jsx";
import AnalysisSummary from "../../components/resume/AnalysisSummary.jsx";
import StrengthCard from "../../components/resume/StrengthCard.jsx";
import WeaknessCard from "../../components/resume/WeaknessCard.jsx";
import MissingSkillsCard from "../../components/resume/MissingSkillsCard.jsx";
import SuggestionsCard from "../../components/resume/SuggestionsCard.jsx";
import LoadingAnalyzer from "../../components/resume/LoadingAnalyzer.jsx";


function ResumeAnalyzerPage() {
  
    const [loading, setLoading] = useState(false);
    const [analyzed, setAnalyzed] = useState(false);

    const handleAnalyze = () => {
    setLoading(true);

    setTimeout(() => {
        setLoading(false);
        setAnalyzed(true);
    }, 3000);
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

      {/* Upload Card */}
      <ResumeUploadCard onAnalyze={handleAnalyze} />
      {loading && <LoadingAnalyzer />}

      {analyzed && (
        <div className="space-y-6">
            <AnalysisSummary />

            <div className="grid gap-6 lg:grid-cols-2">
            <StrengthCard />
            <WeaknessCard />
            </div>

            <MissingSkillsCard />

            <SuggestionsCard />
        </div>
        )}

      {/* Analysis Summary */}
      <AnalysisSummary />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <StrengthCard />
        <WeaknessCard />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <MissingSkillsCard />
        <SuggestionsCard />
        </div>
    </div>

    
  );
}

export default ResumeAnalyzerPage;