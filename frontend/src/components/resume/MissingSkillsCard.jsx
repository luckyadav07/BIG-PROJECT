import Card from "../common/Card.jsx";

function MissingSkillsCard({ skills = [] }) {
  return (
    <Card>
      <h2
        className="text-xl font-semibold mb-5"
        style={{ color: "var(--text-primary)" }}
      >
        🎯 Missing Skills
      </h2>

      {skills.length ? (
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full px-4 py-2 bg-accent/10 border border-accent/30 text-accent text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <p style={{ color: "var(--text-secondary)" }}>
          No missing skills detected.
        </p>
      )}
    </Card>
  );
}

export default MissingSkillsCard;