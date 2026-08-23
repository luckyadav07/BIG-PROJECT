import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Upload, Sparkles, MessageSquare, BookOpen, Compass, ArrowRight, Bot, Target, RotateCcw, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../../components/common/Card.jsx";
import ChatBubble from "../../components/coach/ChatBubble.jsx";
import ChatInput from "../../components/coach/ChatInput.jsx";
import { MOCK_CHAT_MESSAGES } from "../../utils/mockData.js";
import { sendMessage as sendMessageToAI } from "../../services/careerCoachService.js";

const STARTER_CARDS = [
  {
    title: "Mock Interview Prep",
    desc: "Simulate a live technical screen with feedback.",
    prompt: "I want to do a mock technical interview for a Frontend Developer role. Please ask me 5 questions one by one and evaluate my answers.",
    icon: Target,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    title: "Resume Optimizer",
    desc: "Optimize formatting, keywords, and action phrases.",
    prompt: "How can I improve my resume's visual layout, action words, and skills alignment to pass modern ATS filters?",
    icon: Sparkles,
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    title: "Build Skills Roadmap",
    desc: "Map skills roadmap for transition to Full Stack.",
    prompt: "What are the most in-demand frontend and backend technologies I should learn to transition into a Full Stack role?",
    icon: BookOpen,
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  {
    title: "Career Transition Path",
    desc: "Step-by-step checklist to enter tech from other fields.",
    prompt: "I want to transition into software engineering from a non-technical background. Can you outline a step-by-step career path?",
    icon: Compass,
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
];

const SUGGESTED_PROMPTS = [
  "How do I prepare for interviews?",
  "What skills should I learn?",
  "Analyze my resume",
  "Career advice",
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

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

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: "var(--border-color)" }}>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2.5 tracking-tight">
            <Bot className="text-accent" />
            AI Career Coach
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Get personalized advice on job searches, resume formatting, and interview preparations.
          </p>
        </div>

        {messages.length > 0 && (
          <button
            onClick={handleClearChat}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-400 hover:text-white rounded-lg border border-white/5 bg-white/5 transition cursor-pointer"
          >
            <RotateCcw size={12} />
            Reset Conversation
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-14rem)] items-stretch">
        {/* Main Chat Area */}
        <div className="lg:col-span-3 flex flex-col rounded-2xl border border-white/5 overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(26, 31, 43, 0.8) 0%, rgba(20, 24, 32, 0.9) 100%)" }}>
          
          {/* Messages Flow Container */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-2">
            <AnimatePresence>
              {messages.length === 0 ? (
                /* Premium AI Starter Screen */
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="h-full flex flex-col justify-center items-center py-6"
                >
                  <motion.div
                    variants={itemVariants}
                    className="h-14 w-14 rounded-2xl bg-accent/15 border border-accent/25 flex items-center justify-center text-accent-light mb-4 shadow-sm"
                  >
                    <Bot size={28} className="animate-pulse" />
                  </motion.div>

                  <motion.h2
                    variants={itemVariants}
                    className="text-xl md:text-2xl font-extrabold text-white tracking-tight text-center"
                  >
                    Welcome to Career Coach AI
                  </motion.h2>
                  
                  <motion.p
                    variants={itemVariants}
                    className="text-xs md:text-sm text-gray-400 mt-1.5 mb-8 max-w-md text-center leading-relaxed"
                  >
                    Ask me anything about interview checklists, code formats, or resume styles. Pick a suggestion below to start audit.
                  </motion.p>

                  {/* Template Prompt Grid */}
                  <motion.div
                    variants={containerVariants}
                    className="grid sm:grid-cols-2 gap-4 max-w-2xl w-full"
                  >
                    {STARTER_CARDS.map((card) => {
                      const Icon = card.icon;
                      return (
                        <motion.div
                          key={card.title}
                          variants={itemVariants}
                          whileHover={{ scale: 1.015, borderColor: "var(--color-accent)", boxShadow: "0 0 20px rgba(99, 102, 241, 0.05)" }}
                          onClick={() => sendMessage(card.prompt)}
                          className="p-4 rounded-xl border border-white/5 bg-white/5 cursor-pointer flex gap-3 text-left transition-all duration-200"
                        >
                          <div className={`h-9 w-9 shrink-0 rounded-lg flex items-center justify-center border ${card.color}`}>
                            <Icon size={16} />
                          </div>
                          <div>
                            <h3 className="text-xs font-bold text-white flex items-center gap-1">
                              {card.title}
                              <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </h3>
                            <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">
                              {card.desc}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </motion.div>
              ) : (
                /* Conversation Messages */
                messages.map((msg) => (
                  <ChatBubble
                    key={msg.id}
                    message={msg.text}
                    isUser={msg.isUser}
                    timestamp={msg.timestamp}
                  />
                ))
              )}
            </AnimatePresence>

            {/* Pulsing AI Typing bubble */}
            {typing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3.5 mb-4 items-start"
              >
                <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 text-gray-400 shrink-0 flex items-center justify-center shadow-sm">
                  <Bot size={16} />
                </div>
                <div className="bg-white/5 border border-white/5 text-gray-400 rounded-2xl rounded-tl-sm px-4 py-3.5 flex items-center gap-1.5 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick helper prompts when active */}
          {messages.length > 0 && (
            <div className="px-4 pb-2.5 overflow-x-auto scrollbar-none flex gap-2">
              {SUGGESTED_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => sendMessage(p)}
                  className="shrink-0 rounded-full bg-white/5 border border-white/5 hover:border-accent/20 px-3.5 py-1.5 text-xs font-semibold text-gray-400 hover:text-white transition duration-200 cursor-pointer"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input Panel */}
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={sendMessage}
            disabled={typing}
          />
        </div>

        {/* Sidebar Column */}
        <div className="space-y-4 hidden lg:block">
          {/* Profile Context */}
          <Card className="border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
            <h3 className="font-bold text-sm text-white flex items-center gap-1.5 mb-2.5">
              <HelpCircle size={15} className="text-accent-light" />
              Conversation context
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed font-semibold">
              The AI career coach reviews details extracted from your active profile, matching jobs catalog, and parsed resumes to optimize its guidance.
            </p>
          </Card>

          {/* Resume Upload Navigation Card */}
          <Card className="border border-white/5">
            <h3 className="font-bold text-sm text-white mb-3">Optimize Resume format</h3>
            <Link to="/resume-analyzer">
              <button
                className="flex flex-col items-center justify-center gap-2.5 w-full rounded-xl border border-dashed border-white/10 px-4 py-6 text-xs text-gray-400 hover:text-white hover:border-accent/20 transition-all duration-200 cursor-pointer bg-white/[0.01]"
              >
                <Upload size={18} className="text-accent" />
                <span>Upload to Resume Analyzer</span>
              </button>
            </Link>
          </Card>

          {/* Recent topics suggestion */}
          <Card className="border border-white/5">
            <h3 className="font-bold text-sm text-white mb-3 flex items-center gap-1.5">
              <MessageSquare size={14} className="text-accent-light" />
              Recent suggestions
            </h3>
            <div className="space-y-2 text-xs">
              {[
                "Explain the STAR interview method",
                "Suggest projects for a Full-Stack candidate",
                "How do I write a thank you letter?"
              ].map((c) => (
                <button
                  key={c}
                  onClick={() => sendMessage(c)}
                  className="block w-full text-left text-gray-400 hover:text-white transition duration-200 py-1.5 border-b border-white/5 last:border-b-0 font-semibold truncate"
                >
                  {c}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CareerCoachPage;
