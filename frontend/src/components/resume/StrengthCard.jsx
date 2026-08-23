import Card from "../common/Card.jsx";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

function StrengthCard({ strengths = [] }) {
  return (
    <Card className="border relative overflow-hidden h-full" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
      {/* Light decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

      <h2
        className="text-base font-bold mb-5 pb-2 border-b flex items-center gap-2"
        style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }}
      >
        <span className="text-emerald-400">💪</span>
        Key Strengths
      </h2>

      {strengths.length ? (
        <div className="space-y-3">
          {strengths.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="flex items-start gap-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 p-3.5 hover:border-emerald-500/20 transition-all duration-200"
            >
              <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={16} />
              <span className="text-sm leading-relaxed font-medium" style={{ color: "var(--text-primary)" }}>
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>
          No strengths identified yet.
        </p>
      )}
    </Card>
  );
}

export default StrengthCard;