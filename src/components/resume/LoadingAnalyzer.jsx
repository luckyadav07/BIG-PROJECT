import { Loader2 } from "lucide-react";

function LoadingAnalyzer() {
  return (
    <div
      className="rounded-2xl border p-12 text-center animate-pulse"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="flex justify-center mb-6">
        <Loader2
          size={56}
          className="animate-spin"
          style={{ color: "var(--color-accent)" }}
        />
      </div>

      <h2
        className="text-2xl font-bold mb-3"
        style={{ color: "var(--text-primary)" }}
      >
        Analyzing Resume...
      </h2>

      <p
        className="max-w-lg mx-auto"
        style={{ color: "var(--text-secondary)" }}
      >
        Our AI is scanning your resume, extracting skills,
        checking ATS compatibility, and generating personalized
        suggestions.
      </p>
    </div>
  );
}

export default LoadingAnalyzer;