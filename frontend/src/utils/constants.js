export const APP_NAME = import.meta.env.VITE_APP_NAME || "JobReachAI";
export const APP_TAGLINE = "Find Better Jobs Faster with AI";

export const STATUS_COLORS = {
  applied: "neutral",
  interview: "info",
  offer: "success",
  rejected: "danger",
};

export const JOB_TYPES = ["fulltime", "internship", "remote"];
export const EXPERIENCE_LEVELS = ["fresher", "0-1 years", "1-3 years", "3+ years"];

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Jobs", href: "/jobs" },
  { label: "Dashboard", href: "/login" },
  { label: "Pricing", href: "#pricing" },
];

export const DASHBOARD_NAV = [
  { label: "Dashboard", path: "/dashboard", icon: "LayoutDashboard" },
  { label: "Jobs", path: "/jobs", icon: "Briefcase" },
  { label: "Recommended", path: "/recommended", icon: "Sparkles" },
  { label: "Applications", path: "/applications", icon: "FileCheck" },

  {
    label: "Resume Analyzer",
    path: "/resume-analyzer",
    icon: "FileSearch",
  },

  { label: "Career Coach", path: "/career-coach", icon: "MessageCircle" },
  { label: "Notifications", path: "/notifications", icon: "Bell" },
  { label: "Profile", path: "/profile", icon: "User" },
];
