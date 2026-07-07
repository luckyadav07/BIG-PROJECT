import Card from "../common/Card.jsx";
import { FileText, Code2, FolderGit2, GraduationCap, Briefcase } from "lucide-react";

const stats = [
  {
    title: "Resume",
    value: "Uploaded",
    icon: FileText,
  },
  {
    title: "Skills",
    value: "12",
    icon: Code2,
  },
  {
    title: "Projects",
    value: "5",
    icon: FolderGit2,
  },
  {
    title: "Education",
    value: "2",
    icon: GraduationCap,
  },
  {
    title: "Experience",
    value: "1 Year",
    icon: Briefcase,
  },
];

function AnalysisSummary() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.title}>
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.title}
                </p>

                <h3
                  className="text-2xl font-bold mt-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.value}
                </h3>
              </div>

              <div className="h-11 w-11 rounded-xl bg-accent/20 flex items-center justify-center">
                <Icon className="text-accent" size={22} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default AnalysisSummary;