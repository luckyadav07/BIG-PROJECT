import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export const parseResume = async (file) => {
  if (!file) {
    throw new Error("Resume file is required.");
  }

  let text = "";

  // PDF
  if (file.mimetype === "application/pdf") {
    const data = await pdfParse(file.buffer);
    text = data.text;
  }

  // DOCX
  else if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({
      buffer: file.buffer,
    });

    text = result.value;
  }

  // DOC (not fully supported)
  else if (file.mimetype === "application/msword") {
    throw new Error(
      "DOC format is currently not supported. Please upload PDF or DOCX."
    );
  } else {
    throw new Error("Unsupported file format.");
  }

  const email =
    text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || "";

  const phone =
    text.match(
      /(\+?\d{1,3}[-.\s]?)?(\(?\d{3,5}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/
    )?.[0] || "";

  const skills = [
    "Java",
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Python",
    "SQL",
    "HTML",
    "CSS",
    "Tailwind",
    "Docker",
    "AWS",
    "Git",
    "TypeScript",
  ].filter((skill) =>
    text.toLowerCase().includes(skill.toLowerCase())
  );

  return {
    rawText: text,

    name: text.split("\n")[0]?.trim() || "",

    email,

    phone,

    skills,

    education: [],

    experience: [],

    projects: [],
  };
};