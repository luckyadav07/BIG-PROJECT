import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Copy, Check, Bot, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "highlight.js/styles/github-dark.css";
import { formatRelativeTime } from "../../utils/formatters.js";
import useUIStore from "../../store/uiStore.js";

function ChatBubble({ message, isUser, timestamp }) {
  const showToast = useUIStore((s) => s.showToast);
  const [copied, setCopied] = useState(false);

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    showToast({ message: "Message copied to clipboard!", type: "success" });
    setTimeout(() => setCopied(false), 2000);
  };

  // Custom components for Markdown rendering (Code blocks, lists, links)
  const renderers = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const codeString = String(children).replace(/\n$/, "");
      
      const [codeCopied, setCodeCopied] = useState(false);
      const handleCopyCode = () => {
        navigator.clipboard.writeText(codeString);
        setCodeCopied(true);
        showToast({ message: "Code block copied!", type: "success" });
        setTimeout(() => setCodeCopied(false), 2000);
      };

      return !inline && match ? (
        <div className="border rounded-xl overflow-hidden my-4 shadow-sm" style={{ borderColor: "var(--border-color)" }}>
          <div 
            className="flex items-center justify-between px-4 py-2 border-b text-[10px] font-mono tracking-wide"
            style={{ background: "var(--bg-elevated)", borderColor: "var(--border-color)", color: "var(--text-secondary)" }}
          >
            <span>{match[1].toUpperCase()}</span>
            <button
              onClick={handleCopyCode}
              className="hover:text-accent flex items-center gap-1.5 transition font-semibold cursor-pointer"
            >
              {codeCopied ? <Check size={12} className="text-success" /> : <Copy size={12} />}
              {codeCopied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="!m-0 !p-4 overflow-x-auto text-xs font-mono leading-relaxed" style={{ background: "var(--bg-main)" }}>
            <code className={className} {...props}>
              {children}
            </code>
          </pre>
        </div>
      ) : (
        <code 
          className="px-1.5 py-0.5 rounded-md text-accent-light text-xs font-mono font-semibold" 
          style={{ background: "var(--bg-input)" }}
          {...props}
        >
          {children}
        </code>
      );
    },
    p({ children }) {
      return <p className="mb-3 last:mb-0 leading-relaxed text-sm">{children}</p>;
    },
    ul({ children }) {
      return <ul className="list-disc pl-5 mb-3 space-y-1 text-sm">{children}</ul>;
    },
    ol({ children }) {
      return <ol className="list-decimal pl-5 mb-3 space-y-1 text-sm">{children}</ol>;
    },
    li({ children }) {
      return <li className="leading-relaxed">{children}</li>;
    },
    h1({ children }) {
      return <h1 className="text-lg font-black mt-4 mb-2 first:mt-0" style={{ color: "var(--text-primary)" }}>{children}</h1>;
    },
    h2({ children }) {
      return <h2 className="text-base font-bold mt-3 mb-1.5 first:mt-0" style={{ color: "var(--text-primary)" }}>{children}</h2>;
    },
    a({ href, children }) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent-light hover:underline font-semibold">
          {children}
        </a>
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3.5 mb-4 group ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div
        className={`h-9 w-9 rounded-xl shrink-0 flex items-center justify-center border shadow-sm ${
          isUser
            ? "bg-accent/15 border-accent/20 text-accent-light"
            : ""
        }`}
        style={!isUser ? { background: "var(--bg-elevated)", borderColor: "var(--border-color)", color: "var(--text-secondary)" } : undefined}
      >
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>

      {/* Message Block */}
      <div className={`flex flex-col max-w-[80%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`rounded-2xl px-4 py-3.5 relative overflow-hidden transition-all duration-200 border ${
            isUser
              ? "bg-accent text-white border-accent-dark rounded-tr-sm shadow-sm"
              : "rounded-tl-sm"
          }`}
          style={!isUser ? { background: "var(--bg-elevated)", borderColor: "var(--border-color)", color: "var(--text-primary)" } : undefined}
        >
          {/* Subtle light effect for AI bubble */}
          {!isUser && (
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
          )}

          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              components={renderers}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {message}
            </ReactMarkdown>
          </div>
        </div>

        {/* Footer info (Timestamp & Copy response) */}
        <div className="flex items-center gap-3 mt-1.5 px-1 text-[10px] font-semibold text-gray-500">
          {timestamp && <span>{formatRelativeTime(timestamp)}</span>}
          
          {!isUser && (
            <button
              onClick={handleCopyMessage}
              className="opacity-0 group-hover:opacity-100 hover:text-accent transition-opacity duration-200 flex items-center gap-1 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={11} className="text-success" />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={11} />
                  Copy
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ChatBubble;