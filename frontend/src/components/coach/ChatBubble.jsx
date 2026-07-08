import { formatRelativeTime } from "../../utils/formatters.js";

function ChatBubble({ message, isUser, timestamp }) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[80%] rounded-xl px-4 py-3 ${
          isUser ? "bg-accent text-white rounded-br-sm" : "bg-white/10 text-gray-200 rounded-bl-sm"
        }`}
      >
        <p className="text-sm leading-relaxed">{message}</p>
        {timestamp && (
          <p className={`text-[10px] mt-1 ${isUser ? "text-white/60" : "text-gray-500"}`}>
            {formatRelativeTime(timestamp)}
          </p>
        )}
      </div>
    </div>
  );
}

export default ChatBubble;
