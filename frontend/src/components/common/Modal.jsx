import { X } from "lucide-react";

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass-card w-full max-w-md p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
          <button onClick={onClose} className="text-gray-400 hover:text-white transition ml-auto">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
