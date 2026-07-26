import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Sparkles,
  FileCheck,
  MessageCircle,
  Bell,
  User,
  LogOut,
  X,
  FileSearch,
  Users,
  FileText,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext.jsx";
import { APP_NAME } from "../../utils/constants.js";
import { getInitials } from "../../utils/formatters.js";
import useUIStore from "../../store/uiStore.js";
import Tooltip from "../common/Tooltip.jsx";

const iconMap = {
  LayoutDashboard,
  Briefcase,
  Sparkles,
  FileCheck,
  MessageCircle,
  Bell,
  User,
  FileSearch,
  Users,
  FileText,
  BarChart3,
};

function NavLink({ item, collapsed, onNavigate }) {
  const location = useLocation();
  const Icon = iconMap[item.icon];

  const resolvedActive =
    item.path === "/admin"
      ? location.pathname === "/admin"
      : item.path === "/dashboard"
        ? location.pathname === "/dashboard"
        : location.pathname === item.path ||
          location.pathname.startsWith(`${item.path}/`);

  const linkContent = (
    <Link
      to={item.path}
      onClick={onNavigate}
      aria-current={resolvedActive ? "page" : undefined}
      className={`focus-ring group relative flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200 ${
        collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5"
      }`}
      style={{
        background: resolvedActive ? "var(--sidebar-active-bg)" : "transparent",
        color: resolvedActive ? "var(--sidebar-active-text)" : "var(--text-secondary)",
      }}
      onMouseEnter={(e) => {
        if (!resolvedActive) {
          e.currentTarget.style.background = "var(--sidebar-hover-bg)";
          e.currentTarget.style.color = "var(--text-primary)";
        }
      }}
      onMouseLeave={(e) => {
        if (!resolvedActive) {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "var(--text-secondary)";
        }
      }}
    >
      {resolvedActive && (
        <span
          className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-full accent-gradient"
          aria-hidden
        />
      )}

      <span
        className={`relative flex shrink-0 items-center justify-center rounded-lg transition-colors ${
          item.ai ? "h-8 w-8" : "h-7 w-7"
        }`}
        style={{
          background: item.ai
            ? resolvedActive
              ? "linear-gradient(135deg, rgba(79,70,229,0.25), rgba(124,58,237,0.25))"
              : "linear-gradient(135deg, rgba(79,70,229,0.12), rgba(124,58,237,0.12))"
            : resolvedActive
              ? "rgba(99, 102, 241, 0.15)"
              : "transparent",
        }}
      >
        <Icon
          size={item.ai ? 16 : 17}
          className={item.ai && resolvedActive ? "text-indigo-400" : ""}
        />
      </span>

      {!collapsed && (
        <span className="truncate flex-1">{item.label}</span>
      )}

      {!collapsed && item.ai && (
        <span className="shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide accent-gradient text-white">
          AI
        </span>
      )}
    </Link>
  );

  if (collapsed) {
    return <Tooltip label={item.label}>{linkContent}</Tooltip>;
  }

  return linkContent;
}

function Sidebar({
  sections,
  mobileOpen,
  onMobileClose,
  variant = "user",
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const collapsed = useUIStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavigate = () => {
    if (mobileOpen) onMobileClose();
  };

  const sidebarWidth = collapsed ? "w-[72px]" : "w-[260px]";

  const sidebarInner = (
    <div
      className={`flex h-full flex-col ${sidebarWidth} transition-all duration-300 ease-in-out`}
    >
      {/* Logo */}
      <div
        className={`flex items-center gap-3 px-4 h-16 shrink-0 ${
          collapsed ? "justify-center px-3" : ""
        }`}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl accent-gradient shadow-md">
          <Sparkles size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <span
              className="text-base font-bold tracking-tight block truncate"
              style={{ color: "var(--text-primary)" }}
            >
              {APP_NAME}
            </span>
            {variant === "admin" && (
              <span
                className="text-[10px] font-medium uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                Admin
              </span>
            )}
          </div>
        )}
        {mobileOpen && (
          <button
            type="button"
            onClick={onMobileClose}
            className="focus-ring ml-auto lg:hidden rounded-lg p-1"
            aria-label="Close menu"
            style={{ color: "var(--text-muted)" }}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <p
                className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                {section.title}
              </p>
            )}
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  item={item}
                  collapsed={collapsed}
                  onNavigate={handleNavigate}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div
        className="shrink-0 p-3 border-t"
        style={{ borderColor: "var(--border-color)" }}
      >
        {!collapsed ? (
          <>
            <div className="flex items-center gap-3 px-2 py-2 mb-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-semibold text-white accent-gradient">
                {getInitials(user?.name)}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-medium truncate"
                  style={{ color: "var(--text-primary)" }}
                >
                  {user?.name}
                </p>
                <p
                  className="text-xs truncate"
                  style={{ color: "var(--text-muted)" }}
                >
                  {user?.email}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="focus-ring flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-[var(--sidebar-hover-bg)]"
              style={{ color: "var(--text-secondary)" }}
            >
              <LogOut size={16} />
              Logout
            </button>
          </>
        ) : (
          <Tooltip label="Logout">
            <button
              type="button"
              onClick={handleLogout}
              className="focus-ring flex w-full items-center justify-center rounded-xl p-2.5 transition-colors hover:bg-[var(--sidebar-hover-bg)]"
              style={{ color: "var(--text-secondary)" }}
              aria-label="Logout"
            >
              <LogOut size={18} />
            </button>
          </Tooltip>
        )}

        <button
          type="button"
          onClick={toggleSidebar}
          className="focus-ring hidden lg:flex mt-2 w-full items-center justify-center gap-2 rounded-xl py-2 text-xs font-medium transition-colors hover:bg-[var(--sidebar-hover-bg)]"
          style={{ color: "var(--text-muted)" }}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop floating sidebar */}
      <aside
        className={`hidden lg:flex shrink-0 ${sidebarWidth} transition-all duration-300 ease-in-out`}
        aria-label="Main navigation"
      >
        <div
          className="flex h-[calc(100vh-2rem)] w-full flex-col rounded-2xl my-4 ml-4 overflow-hidden"
          style={{
            background: "var(--bg-sidebar)",
            border: "1px solid var(--border-color)",
            boxShadow: "var(--shadow-sidebar)",
          }}
        >
          {sidebarInner}
        </div>
      </aside>

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 lg:hidden transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        <div
          className={`h-full ${sidebarWidth} overflow-hidden`}
          style={{
            background: "var(--bg-sidebar)",
            borderRight: "1px solid var(--border-color)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          {sidebarInner}
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
          aria-hidden
        />
      )}
    </>
  );
}

export default Sidebar;
