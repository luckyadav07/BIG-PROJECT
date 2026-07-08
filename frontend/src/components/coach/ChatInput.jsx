import { Send } from "lucide-react";

function ChatInput({ value, onChange, onSend, disabled }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) onSend(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t border-white/10">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your message..."
        disabled={disabled}
        className="flex-1 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="flex h-10 w-10 items-center justify-center rounded-lg accent-gradient text-white disabled:opacity-50 transition hover:opacity-90"
      >
        <Send size={18} />
      </button>
    </form>
  );
}

export default ChatInput;
