import Card from "../common/Card.jsx";
import { Sparkles } from "lucide-react";

function SuggestionsCard({ suggestions = [] }) {
  return (
    <Card>
      <h2
        className="text-xl font-semibold mb-5"
        style={{ color: "var(--text-primary)" }}
      >
        💡 AI Suggestions
      </h2>

      {suggestions.length ? (
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
      ) : (
        <p style={{ color: "var(--text-secondary)" }}>
          No suggestions available.
        </p>
      )}
    </Card>
  );
}

export default SuggestionsCard;