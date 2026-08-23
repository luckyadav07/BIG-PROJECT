import Card from "../common/Card.jsx";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

function MissingSkillsCard({ skills = [] }) {
  return (
    <Card className="border border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

      <h2
        className="text-base font-bold mb-5 pb-2 border-b flex items-center gap-2 text-white"
        style={{ borderColor: "var(--border-color)" }}
      >
        <BookOpen className="text-blue-400 shrink-0" size={16} />
        ATS Key Skills Gaps
      </h2>

      {skills.length ? (
        <div className="flex flex-wrap gap-2.5">
          {skills.map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.03, type: "spring", stiffness: 100 }}
              className="rounded-xl px-3.5 py-2 text-xs font-semibold border border-white/5 transition hover:bg-white/10"
              style={{
                background: "var(--glass-bg)",
                color: "var(--text-secondary)",
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400">
          Excellent! No missing key skills detected relative to your profile targets.
        </p>
      )}
    </Card>
  );
}

export default MissingSkillsCard;