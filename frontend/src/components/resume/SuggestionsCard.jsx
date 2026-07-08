import Card from "../common/Card.jsx";
import { Sparkles } from "lucide-react";

const suggestions = [
  "Add measurable achievements.",
  "Include GitHub repository links.",
  "Mention deployment URLs.",
  "Add certifications.",
];

function SuggestionsCard() {
  return (
    <Card>
      <h2
        className="text-xl font-semibold mb-5"
        style={{ color: "var(--text-primary)" }}
      >
        💡 AI Suggestions
      </h2>

      <div className="space-y-3">
        {suggestions.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3"
          >
            <Sparkles
              size={18}
              className="text-accent mt-1"
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

export default SuggestionsCard;