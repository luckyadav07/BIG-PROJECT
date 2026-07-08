const SKILLS = [
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "JavaScript",
  "TypeScript",
  "Docker",
  "AWS",
  "Redis",
  "Git",
  "GitHub",
  "MySQL",
  "PostgreSQL",
  "Linux",
  "Python",
  "Java",
  "C++",
  "HTML",
  "CSS",
  "Tailwind",
  "Next.js",
  "DSA",
];

const REQUIRED_SKILLS = [
  "React",
  "Node.js",
  "MongoDB",
  "Docker",
  "Git",
  "JavaScript",
  "AWS",
  "Redis",
  "TypeScript",
];

export function analyzeResume(text) {

  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  // ---------- NAME ----------
  let name = "";

  for (const line of lines) {
    if (
      line.length > 3 &&
      /^[A-Za-z ]+$/.test(line) &&
      !line.toLowerCase().includes("education") &&
      !line.toLowerCase().includes("skills")
    ) {
      name = line;
      break;
    }
  }

  // ---------- EMAIL ----------

let email = "";

// Remove phone numbers first because PDF parsers often glue
// phone + email together.
const cleanedText = text.replace(/\+91[\s-]?[6-9]\d{9}/g, " ");

const emailMatch = cleanedText.match(
  /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/
);

if (emailMatch) {
  email = emailMatch[0].replace(
    /(LEETCODE|LinkedIn|GitHub|Website).*$/i,
    ""
  );
}

  

  // ---------- PHONE ----------

  const phone =
    text.match(/(\+91[\s-]?)?[6-9]\d{9}/)?.[0] || "";

  // ---------- SKILLS ----------

  const skills = SKILLS.filter((skill) =>
    text.toLowerCase().includes(skill.toLowerCase())
  );

  // ---------- EDUCATION ----------

  const education = [];

  if (text.includes("Delhi Technological University"))
    education.push("Delhi Technological University");

  if (text.includes("Bachelor"))
    education.push("Bachelor Degree");

  // ---------- PROJECT COUNT ----------

  const projects =
    (text.match(/Technologies\s*\/\s*Tools\s*Used/g) || []).length;

  // ---------- EXPERIENCE ----------

  const experience =
    (text.match(/WORK EXPERIENCE/gi) || []).length;

  // ---------- MISSING SKILLS ----------

  const missingSkills = REQUIRED_SKILLS.filter(
    (skill) => !skills.includes(skill)
  );

  // ---------- ATS SCORE ----------

  let atsScore = 50;

  atsScore += skills.length * 3;

  if (education.length) atsScore += 10;

  if (projects > 0) atsScore += 10;

  if (phone) atsScore += 5;

  if (email) atsScore += 5;

  atsScore = Math.min(100, atsScore);

  return {
    name,
    email,
    phone,
    skills,
    education,
    projects,
    experience,
    atsScore,
    missingSkills,
  };
}