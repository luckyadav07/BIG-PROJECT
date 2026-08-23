import { useState, useRef } from "react";
import { UploadCloud, FileText, X, Sparkles, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../common/Button.jsx";
import useResumeStore from "../../store/resumeStore.js";
import useUIStore from "../../store/uiStore.js";

function ResumeUploadCard({ onAnalyze }) {
  const showToast = useUIStore((s) => s.showToast);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const {
    file,
    setFile,
    clearResume,
    uploading,
    analyzing,
    uploadProgress,
  } = useResumeStore();

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
    const selected = e.target.files[0];
    if (selected && validateFile(selected)) {
      setFile(selected);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && validateFile(dropped)) {
      setFile(dropped);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className="rounded-2xl border !p-6 md:!p-8 shadow-sm transition-all duration-300 border-white/5 relative"
      style={{
        background: "linear-gradient(135deg, rgba(26, 31, 43, 0.8) 0%, rgba(20, 24, 32, 0.9) 100%)",
      }}
    >
      {/* Decorative ambient light */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <motion.div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        animate={{
          borderColor: isDragOver ? "var(--color-accent)" : "rgba(255, 255, 255, 0.1)",
          background: isDragOver ? "rgba(99, 102, 241, 0.04)" : "rgba(255, 255, 255, 0.01)",
          boxShadow: isDragOver ? "0 0 24px rgba(99, 102, 241, 0.1)" : "none",
        }}
        className="border-2 border-dashed rounded-2xl p-8 md:p-12 text-center transition-all duration-300 relative overflow-hidden"
      >
        {/* Upload zone contents */}
        <div className="flex flex-col items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={triggerFileInput}
            className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
          >
            <UploadCloud
              size={36}
              className="text-accent-light animate-pulse-slow"
            />
          </motion.div>

          <h2
            className="text-lg md:text-xl font-bold mb-2 text-white"
          >
            Drag & Drop your resume here
          </h2>

          <p
            className="text-xs md:text-sm text-gray-400 mb-6 max-w-md mx-auto leading-relaxed"
          >
            Supports PDF, DOC, and DOCX formats up to <strong className="text-gray-300">5 MB</strong>.
          </p>

          <input
            ref={fileInputRef}
            id="resume-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <Button
            onClick={triggerFileInput}
            disabled={uploading || analyzing}
            className="font-semibold text-xs py-2 px-5 rounded-lg flex items-center gap-2"
          >
            <UploadCloud size={14} />
            {file ? "Choose Different File" : "Browse Files"}
          </Button>
        </div>

        {/* Selected File Preview Capsule */}
        <AnimatePresence>
          {file && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="mt-8 rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left border-white/5 relative backdrop-blur-md"
              style={{
                background: "var(--glass-bg)",
              }}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-accent/15 border border-accent/25 flex items-center justify-center text-accent">
                  <FileText size={20} />
                </div>

                <div className="min-w-0">
                  <h3
                    className="font-semibold text-sm text-white truncate max-w-[200px] sm:max-w-md"
                  >
                    {file.name}
                  </h3>

                  <p
                    className="text-xs text-gray-400 mt-0.5"
                  >
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 self-end sm:self-center">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={clearResume}
                  disabled={uploading || analyzing}
                  className="!rounded-lg text-gray-400 hover:text-white text-xs px-3 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <X size={14} />
                  Cancel
                </Button>

                <Button
                  size="sm"
                  onClick={onAnalyze}
                  disabled={uploading || analyzing}
                  className="!rounded-lg font-bold text-xs px-4 py-2 flex items-center gap-1.5 shadow-sm"
                >
                  <Sparkles size={12} />
                  {uploading
                    ? "Uploading..."
                    : analyzing
                    ? "Analyzing..."
                    : "Analyze Resume"}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload Progress Bar */}
        <AnimatePresence>
          {uploading && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 overflow-hidden text-left"
            >
              <div className="flex justify-between items-center text-xs font-semibold text-gray-400 mb-2">
                <span>Uploading to Secure Vault</span>
                <span className="text-accent-light font-bold">{uploadProgress}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default ResumeUploadCard;