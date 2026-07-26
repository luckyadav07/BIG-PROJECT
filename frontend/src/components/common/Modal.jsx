import { useEffect, useRef } from "react";
import { X } from "lucide-react";

function Modal({ isOpen, onClose, title, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        tabIndex={-1}
        className="relative w-full max-w-md rounded-2xl p-6 animate-fade-in focus:outline-none"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h3
              id="modal-title"
              className="text-lg font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {title}
            </h3>
          )}
          <button
            onClick={onClose}
            className="focus-ring ml-auto rounded-lg p-1 transition-colors hover:bg-[var(--sidebar-hover-bg)]"
            aria-label="Close dialog"
            style={{ color: "var(--text-muted)" }}
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
