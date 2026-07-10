import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/github-dark.css";

import { formatRelativeTime } from "../../utils/formatters.js";

function ChatBubble({ message, isUser, timestamp }) {
  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-3`}
    >
      <div
        className={`max-w-[80%] rounded-xl px-4 py-3 ${
          isUser
            ? "bg-accent text-white rounded-br-sm"
            : "bg-white/10 text-gray-200 rounded-bl-sm"
        }`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          className="prose prose-invert max-w-none prose-p:my-2 prose-pre:rounded-lg prose-code:text-blue-300"
        >
          {message}
        </ReactMarkdown>

        {timestamp && (
          <p
            className={`text-[10px] mt-2 ${
              isUser
                ? "text-white/60"
                : "text-gray-500"
            }`}
          >
            {formatRelativeTime(timestamp)}
          </p>
        )}
      </div>
    </div>
  );
}

export default ChatBubble;