import { UploadCloud, FileText } from "lucide-react";
import Button from "../common/Button.jsx";
import { useState } from "react";
import useUIStore from "../../store/uiStore.js";

function ResumeUploadCard({ onAnalyze }) {
    const showToast = useUIStore((s) => s.showToast);
    const [file, setFile] = useState(null);
    const [dragging, setDragging] = useState(false);
    
    const handleDrop = (e) => {
        e.preventDefault();

        setDragging(false);

        if (!e.dataTransfer.files.length) return;

        const dropped = e.dataTransfer.files[0];

        if (!dropped) return;

        if (!validTypes.includes(dropped.type)) {
            showToast({
            message: "Please upload a PDF, DOC or DOCX file.",
            type: "error",
            });
            return;
        }

        setFile(dropped);
    };

    const removeFile = () => {
    setFile(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragEnter = () => {
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const handleFileChange = (e) => {
    const selected = e.target.files[0];

    if (!selected) return;

    if (!validTypes.includes(selected.type)) {
        showToast({
        message: "Please upload a PDF, DOC or DOCX file.",
        type: "error",
        });
        return;
    }

    setFile(selected);
    setDragging(false);
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
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                dragging
                ? "border-accent bg-accent/10 scale-[1.01]"
                : "hover:border-accent"
            }`}
            style={{
                borderColor: dragging
                ? "var(--color-accent)"
                : "var(--border-color)",
            }}
        >
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-accent/15 flex items-center justify-center">
            <UploadCloud
              size={42}
              style={{ color: "var(--color-accent)" }}
            />
          </div>
        </div>

        <h2
          className="text-2xl font-bold mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Drag & Drop Resume Here
        </h2>

        <p
          className="mb-8 max-w-xl mx-auto"
          style={{ color: "var(--text-secondary)" }}
        >
          Drag and drop your resume anywhere in this area,
          or click <strong>Choose Resume</strong> below to browse your files.
          Supported formats: PDF, DOC, DOCX (Max 5 MB).
        </p>

        <label className="block cursor-pointer">
        <input
            type="file"
            accept=".pdf,.doc,.docx"
            hidden
            onChange={handleFileChange}
        />

        <Button>
            <UploadCloud size={18} />
            Choose Resume
        </Button>
        </label>

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
                className="text-accent"
                size={28}
            />

            <div>
                <h3
                className="font-semibold"
                style={{ color: "var(--text-primary)" }}
                >
                {file.name}
                </h3>

                <p
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
                >
                {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
            </div>
            </div>

            <div className="flex gap-3">
            <Button
                variant="outline"
                size="sm"
                onClick={removeFile}
            >
                Remove
            </Button>

            <Button
                size="sm"
                onClick={onAnalyze}
            >
                Analyze Resume
            </Button>
            </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default ResumeUploadCard;