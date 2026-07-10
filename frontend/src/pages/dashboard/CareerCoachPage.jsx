import { useState, useRef, useEffect } from "react";
import { Upload } from "lucide-react";
import Card from "../../components/common/Card.jsx";
import ChatBubble from "../../components/coach/ChatBubble.jsx";
import ChatInput from "../../components/coach/ChatInput.jsx";
import { MOCK_CHAT_MESSAGES } from "../../utils/mockData.js";
import { sendMessage as sendMessageToAI } from "../../services/careerCoachService.js";

const SUGGESTED_PROMPTS = [
  "How do I prepare for interviews?",
  "What skills should I learn?",
  "Analyze my resume",
  "Career advice",
];

function CareerCoachPage() {
  const [messages, setMessages] = useState(MOCK_CHAT_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = async (text) => {
  if (!text.trim()) return;

  const userMsg = {
    id: Date.now(),
    text,
    isUser: true,
    timestamp: new Date().toISOString(),
  };

  const updatedMessages = [...messages, userMsg];

  setMessages(updatedMessages);
  setInput("");
  setTyping(true);

  try {
    const aiReply = await sendMessageToAI(
      updatedMessages.map((msg) => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.text,
      }))
    );

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        text: aiReply,
        isUser: false,
        timestamp: new Date().toISOString(),
      },
    ]);
  } catch (error) {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        text: "Sorry, something went wrong. Please try again.",
        isUser: false,
        timestamp: new Date().toISOString(),
      },
    ]);

    console.error(error);
  } finally {
    setTyping(false);
  }
};

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">AI Career Coach</h1>
      <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
        <div className="lg:col-span-3 flex flex-col glass-card overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg.text} isUser={msg.isUser} timestamp={msg.timestamp} />
            ))}
            {typing && (
              <div className="flex gap-1 px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {SUGGESTED_PROMPTS.map((p) => (
              <button key={p} onClick={() => sendMessage(p)} className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-gray-400 hover:border-accent/30 hover:text-accent transition">
                {p}
              </button>
            ))}
          </div>
          <ChatInput value={input} onChange={setInput} onSend={sendMessage} disabled={typing} />
        </div>

        <div className="space-y-4 hidden lg:block">
          <Card>
            <h3 className="font-semibold text-white mb-2">Context</h3>
            <p className="text-sm text-gray-400">Based on your profile, I can help with interview prep, skill development, and career planning.</p>
          </Card>
          <Card>
            <h3 className="font-semibold text-white mb-3">Upload Resume</h3>
            <button className="flex items-center gap-2 w-full rounded-lg border border-dashed border-white/20 px-4 py-6 text-sm text-gray-400 hover:border-accent/30 transition">
              <Upload size={18} /> Upload for analysis
            </button>
          </Card>
          <Card>
            <h3 className="font-semibold text-white mb-2">Recent Chats</h3>
            <div className="space-y-2">
              {["Interview prep tips", "Skill gap analysis", "Resume review"].map((c) => (
                <button key={c} className="block w-full text-left text-sm text-gray-400 hover:text-accent transition py-1">{c}</button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CareerCoachPage;
