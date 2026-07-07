import Card from "../common/Card.jsx";
import { AlertTriangle } from "lucide-react";

const weaknesses = [
  "No certifications",
  "No quantified achievements",
  "Professional summary is too short",
];

function WeaknessCard() {
  return (
    <Card>
      <h2
        className="text-xl font-semibold mb-5"
        style={{ color: "var(--text-primary)" }}
      >
        ⚠️ Improvements
      </h2>

      <div className="space-y-3">
        {weaknesses.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 p-3"
          >
            <AlertTriangle
              className="text-yellow-400"
              size={18}
            />

            <span style={{ color: "var(--text-primary)" }}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default WeaknessCard;