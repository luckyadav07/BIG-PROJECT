import Card from "../common/Card.jsx";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

function WeaknessCard({ weaknesses = [] }) {
  return (
    <Card className="border border-white/5 relative overflow-hidden h-full">
      {/* Light decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

      <h2
        className="text-base font-bold mb-5 pb-2 border-b flex items-center gap-2 text-white"
        style={{ borderColor: "var(--border-color)" }}
      >
        <span className="text-amber-400">⚠️</span>
        Improvement Areas
      </h2>

      {weaknesses.length ? (
        <div className="space-y-3">
          {weaknesses.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="flex items-start gap-3 rounded-xl bg-amber-500/5 border border-amber-500/10 p-3.5 hover:border-amber-500/20 transition-all duration-200"
            >
              <AlertCircle className="text-amber-400 shrink-0 mt-0.5" size={16} />
              <span className="text-sm text-gray-200 leading-relaxed font-medium">
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400">
          No improvement areas detected yet.
        </p>
      )}
    </Card>
  );
}

export default WeaknessCard;