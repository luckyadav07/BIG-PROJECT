import { UploadCloud, FileText } from "lucide-react";
import Button from "../common/Button.jsx";

import useResumeStore from "../../store/resumeStore.js";
import useUIStore from "../../store/uiStore.js";

function ResumeUploadCard({ onAnalyze }) {
  const showToast = useUIStore((s) => s.showToast);

  const {
    file,
    setFile,
    clearResume,
    uploading,
    analyzing,
    uploadProgress,
  } = useResumeStore();
  console.log("📄 Current file in store:", file);

  const validTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const validateFile = (selected) => {
    if (!selected) return false;

    if (!validTypes.includes(selected.type)) {
      showToast({
        message: "Please upload a PDF, DOC or DOCX file.",
        type: "error",
      });

      return false;
    }

    if (selected.size > 5 * 1024 * 1024) {
      showToast({
        message: "Maximum file size is 5 MB.",
        type: "error",
      });

      return false;
    }

    return true;
  };

  const handleFileChange = (e) => {
    console.log("INPUT FIRED");

    const selected = e.target.files[0];

    console.log(selected);

    if (!validateFile(selected)) return;

    console.log("Calling setFile");

    setFile(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const dropped = e.dataTransfer.files[0];

    if (!validateFile(dropped)) return;

    setFile(dropped);
  };

  return (
    <div
      className="rounded-2xl border p-10"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border-color)",
      }}
    >
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed rounded-2xl p-12 text-center hover:border-accent transition"
        style={{
          borderColor: "var(--border-color)",
        }}
      >
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-accent/15 flex items-center justify-center">
            <UploadCloud
              size={42}
              style={{
                color: "var(--color-accent)",
              }}
            />
          </div>
        </div>

        <h2
          className="text-2xl font-bold mb-3"
          style={{
            color: "var(--text-primary)",
          }}
        >
          Drag & Drop Resume Here
        </h2>

        <p
          className="mb-8 max-w-xl mx-auto"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          Upload your resume for AI-powered analysis.
        </p>

        <input
  id="resume-upload"
  type="file"
  accept=".pdf,.doc,.docx"
  onChange={handleFileChange}
  style={{ display: "none" }}
/>

<Button
  onClick={() =>
    document.getElementById("resume-upload").click()
  }
  disabled={uploading || analyzing}
>
  <UploadCloud size={18} />
  {file ? "Replace Resume" : "Choose Resume"}
</Button>

        {file && (
          <div
            className="mt-8 rounded-xl border p-4 flex items-center justify-between"
            style={{
              borderColor: "var(--border-color)",
              background: "var(--glass-bg)",
            }}
          >
            <div className="flex items-center gap-3">
              <FileText
                size={28}
                className="text-accent"
              />

              <div>
                <h3
                  className="font-semibold"
                  style={{
                    color: "var(--text-primary)",
                  }}
                >
                  {file.name}
                </h3>

                <p
                  className="text-sm"
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                size="sm"
                variant="outline"
                onClick={clearResume}
                disabled={uploading || analyzing}
              >
                Remove
              </Button>

              <Button
                size="sm"
                onClick={onAnalyze}
                disabled={uploading || analyzing}
              >
                {uploading
                  ? "Uploading..."
                  : analyzing
                  ? "Analyzing..."
                  : "Analyze Resume"}
              </Button>
            </div>
          </div>
        )}

        {uploading && (
          <div className="mt-6">
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{
                  width: `${uploadProgress}%`,
                }}
              />
            </div>

            <p
              className="mt-2 text-sm"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Uploading... {uploadProgress}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeUploadCard;