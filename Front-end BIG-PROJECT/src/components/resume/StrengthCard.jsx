import Card from "../common/Card.jsx";
import { CheckCircle2 } from "lucide-react";

function StrengthCard({ strengths = [] }) {
  return (
    <Card>
      <h2
        className="text-xl font-semibold mb-5"
        style={{ color: "var(--text-primary)" }}
      >
        💪 Strengths
      </h2>

      {strengths.length ? (
        <div className="space-y-3">
          {strengths.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-lg bg-green-500/10 border border-green-500/20 p-3"
            >
              <CheckCircle2 className="text-green-400" size={18} />

              <span style={{ color: "var(--text-primary)" }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: "var(--text-secondary)" }}>
          No strengths found.
        </p>
      )}
    </Card>
  );
}

export default StrengthCard;