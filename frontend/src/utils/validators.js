export const emailPattern = /^\S+@\S+\.\S+$/;

export const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: "", color: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const levels = [
    { score: 0, label: "Too weak", color: "bg-danger" },
    { score: 1, label: "Weak", color: "bg-danger" },
    { score: 2, label: "Fair", color: "bg-warning" },
    { score: 3, label: "Good", color: "bg-warning" },
    { score: 4, label: "Strong", color: "bg-success" },
  ];
  return levels[score];
};
