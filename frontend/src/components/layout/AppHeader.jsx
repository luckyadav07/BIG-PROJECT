import { Link } from "react-router-dom";
import { Bell, Menu, Search } from "lucide-react";
import GlobalSearch from "./GlobalSearch.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import UserMenu from "./UserMenu.jsx";

function AppHeader({ onMenuClick }) {
  return (
    <header className="glass-nav sticky top-0 z-20 flex h-16 shrink-0 items-center gap-3 px-4 lg:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="focus-ring flex h-9 w-9 items-center justify-center rounded-xl lg:hidden transition-colors hover:bg-[var(--sidebar-hover-bg)]"
        aria-label="Open navigation menu"
        style={{ color: "var(--text-secondary)" }}
      >
        <Menu size={20} />
      </button>

      <GlobalSearch className="hidden sm:block flex-1 max-w-md" />

      <div className="flex-1 sm:hidden" />

      <div className="flex items-center gap-2">
        <Link
          to="/jobs"
          className="focus-ring flex h-9 w-9 items-center justify-center rounded-xl sm:hidden transition-colors hover:bg-[var(--sidebar-hover-bg)]"
          aria-label="Search jobs"
          style={{ color: "var(--text-secondary)" }}
        >
          <Search size={18} />
        </Link>

        <Link
          to="/notifications"
          className="focus-ring relative flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-[var(--sidebar-hover-bg)]"
          aria-label="Notifications"
          style={{ color: "var(--text-secondary)" }}
        >
          <Bell size={18} />
        </Link>

        <ThemeToggle />

        <div
          className="hidden sm:block h-6 w-px mx-1"
          style={{ background: "var(--border-color)" }}
          aria-hidden
        />

        <UserMenu />
      </div>
    </header>
  );
}

export default AppHeader;
