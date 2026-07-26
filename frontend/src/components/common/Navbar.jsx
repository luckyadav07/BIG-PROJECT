import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import Button from "./Button.jsx";
import { NAV_LINKS, APP_NAME } from "../../utils/constants.js";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    if (href.startsWith("#") && isLanding) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-md" : "bg-transparent"
      }`}
      style={
        scrolled
          ? {
              background: "color-mix(in srgb, var(--bg-main) 88%, transparent)",
              borderBottom: "1px solid var(--border-color)",
            }
          : undefined
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl accent-gradient shadow-md transition-transform group-hover:scale-105">
              <Sparkles size={18} className="text-white" />
            </div>
            <span
              className="text-lg font-bold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {APP_NAME}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) =>
              link.href.startsWith("#") ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium transition-colors hover:text-accent focus-ring rounded-md px-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm font-medium transition-colors hover:text-accent focus-ring rounded-md px-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>

          <button
            className="md:hidden focus-ring rounded-lg p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            style={{ color: "var(--text-primary)" }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden px-4 py-4 space-y-3 animate-fade-in"
          style={{
            background: "var(--bg-card)",
            borderTop: "1px solid var(--border-color)",
          }}
        >
          {NAV_LINKS.map((link) =>
            link.href.startsWith("#") ? (
              <a
                key={link.label}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className="block py-2 text-sm font-medium transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-medium transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                {link.label}
              </Link>
            )
          )}
          <div className="flex gap-3 pt-2">
            <Link to="/login" className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                Login
              </Button>
            </Link>
            <Link to="/register" className="flex-1">
              <Button size="sm" className="w-full">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
