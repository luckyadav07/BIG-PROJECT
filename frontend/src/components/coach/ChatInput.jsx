import { Send, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function ChatInput({ value, onChange, onSend, disabled }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) onSend(value.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) onSend(value.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border-t border-white/5 relative bg-gradient-to-t from-navy-dark to-transparent"
    >
      <div className="relative flex items-center">
        {/* Sparkle decorative element inside input */}
        <div className="absolute left-4 text-gray-500 pointer-events-none">
          <Sparkles size={16} className="animate-pulse" />
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask career coach anything..."
          disabled={disabled}
          className="w-full rounded-xl border border-white/5 bg-white/5 pl-10 pr-14 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 disabled:opacity-50"
          style={{ background: "rgba(255, 255, 255, 0.015)" }}
        />

        <div className="absolute right-2.5">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={disabled || !value.trim()}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white hover:bg-accent-light disabled:opacity-30 disabled:pointer-events-none transition-colors duration-200 shadow-sm"
          >
            <Send size={14} className="ml-0.5" />
          </motion.button>
        </div>
      </div>
    </form>
  );
}

export default ChatInput;
