import Card from "../common/Card.jsx";
import { CheckCircle2 } from "lucide-react";

const strengths = [
  "Strong React knowledge",
  "Well-structured projects",
  "Clean resume formatting",
  "Relevant technical skills",
];

function StrengthCard() {
  return (
    <Card>
      <h2
        className="text-xl font-semibold mb-5"
        style={{ color: "var(--text-primary)" }}
      >
        💪 Strengths
      </h2>

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
    </Card>
  );
}

export default StrengthCard;