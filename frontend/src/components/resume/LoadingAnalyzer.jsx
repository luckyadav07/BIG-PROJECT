import { useState, useEffect } from "react";
import { Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../common/Card.jsx";

const LOADING_STEPS = [
  "Uploading document to secure server...",
  "Initializing resume parser engine...",
  "Extracting professional summary and contacts...",
  "Scanning experience timeline and credentials...",
  "Evaluating technical capability index...",
  "Comparing skills profile against market data...",
  "Drafting resume strengths and checklist improvements...",
  "Generating custom project paths & certifications suggestions...",
];

function LoadingAnalyzer() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="!p-8 md:!p-12 text-center border border-white/5 relative overflow-hidden flex flex-col items-center">
      {/* Dynamic ambient AI light */}
      <div className="absolute -top-24 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />

      {/* Futuristic scanner animation */}
      <div className="relative flex justify-center items-center h-24 w-24 mb-6">
        {/* Outer glowing pulsing orb */}
        <div className="absolute inset-0 rounded-full bg-accent/5 animate-ping border border-accent/10" />
        
        {/* Intermediate pulse */}
        <div className="absolute inset-3 rounded-full bg-accent/10 animate-pulse border border-accent/20" />
        
        {/* Core spinning ring */}
        <div className="absolute inset-6 rounded-2xl bg-accent/15 flex items-center justify-center border border-accent/30 shadow-inner">
          <Loader2 size={24} className="animate-spin text-accent-light" />
        </div>

        {/* Small sparkle orb */}
        <div className="absolute top-1 right-1 h-5 w-5 rounded-full bg-accent flex items-center justify-center shadow-lg border border-white/10 animate-bounce">
          <Sparkles size={10} className="text-white" />
        </div>
      </div>

      <h2
        className="text-xl md:text-2xl font-bold mb-3 text-white tracking-tight"
      >
        AI Resume Analysis in Progress
      </h2>

      <div className="h-6 overflow-hidden max-w-md w-full relative mb-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={stepIndex}
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-xs md:text-sm font-semibold text-accent-light flex items-center justify-center gap-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-light animate-ping shrink-0" />
            {LOADING_STEPS[stepIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <p
        className="max-w-lg mx-auto text-xs md:text-sm text-gray-400 leading-relaxed border-t pt-4 border-white/5"
      >
        Our AI analyzer is checking ATS compatibility, identifying missing skill gaps, and generating structured feedback loops. This usually takes around 5-10 seconds.
      </p>
    </Card>
  );
}

export default LoadingAnalyzer;