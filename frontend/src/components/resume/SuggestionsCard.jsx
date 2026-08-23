import Card from "../common/Card.jsx";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function SuggestionsCard({ suggestions = [] }) {
  return (
    <Card className="border border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-44 h-44 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <h2
        className="text-base font-bold mb-5 pb-2 border-b flex items-center gap-2 text-white"
        style={{ borderColor: "var(--border-color)" }}
      >
        <Sparkles className="text-accent shrink-0" size={18} />
        Actionable AI Recommendations
      </h2>

      {suggestions.length ? (
        <div className="grid gap-3.5 sm:grid-cols-2">
          {suggestions.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.3 }}
              className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-white/5"
            >
              <div className="h-6 w-6 rounded-lg bg-accent/10 flex items-center justify-center text-accent-light shrink-0 mt-0.5">
                <Sparkles size={12} />
              </div>
              <span className="text-sm text-gray-300 leading-relaxed font-semibold">
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400">
          No suggestions available.
        </p>
      )}
    </Card>
  );
}

export default SuggestionsCard;