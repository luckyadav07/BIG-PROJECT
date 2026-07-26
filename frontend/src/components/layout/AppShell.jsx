import { useState } from "react";
import {
  USER_NAV_SECTIONS,
  ADMIN_NAV_SECTIONS,
} from "../../utils/constants.js";
import Sidebar from "./Sidebar.jsx";
import AppHeader from "./AppHeader.jsx";

function AppShell({ children, variant = "user" }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const sections =
    variant === "admin" ? ADMIN_NAV_SECTIONS : USER_NAV_SECTIONS;

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ background: "var(--bg-main)", color: "var(--text-primary)" }}
    >
      <div className="flex min-h-screen">
        <Sidebar
          sections={sections}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
          variant={variant}
        />

        <div className="flex flex-1 flex-col min-w-0 lg:pr-4 lg:pb-4">
          <AppHeader onMenuClick={() => setMobileOpen(true)} />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fade-in">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default AppShell;
