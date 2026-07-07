import Card from "../common/Card.jsx";

const skills = [
  "Docker",
  "AWS",
  "TypeScript",
  "Redis",
  "CI/CD",
];

function MissingSkillsCard() {
  return (
    <Card>
      <h2
        className="text-xl font-semibold mb-5"
        style={{ color: "var(--text-primary)" }}
      >
        🎯 Missing Skills
      </h2>

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
    </Card>
  );
}

export default MissingSkillsCard;