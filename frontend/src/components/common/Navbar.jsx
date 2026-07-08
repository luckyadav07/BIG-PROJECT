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
        scrolled ? "bg-navy/95 shadow-lg shadow-black/20 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg accent-gradient">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-white">{APP_NAME}</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) =>
              link.href.startsWith("#") ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm text-gray-300 hover:text-accent transition"
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.label} to={link.href} className="text-sm text-gray-300 hover:text-accent transition">
                  {link.label}
                </Link>
              )
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-navy/98 border-t border-white/10 px-4 py-4 space-y-3">
          {NAV_LINKS.map((link) =>
            link.href.startsWith("#") ? (
              <a key={link.label} href={link.href} onClick={() => handleNavClick(link.href)} className="block text-gray-300 hover:text-accent py-2">
                {link.label}
              </a>
            ) : (
              <Link key={link.label} to={link.href} onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-accent py-2">
                {link.label}
              </Link>
            )
          )}
          <div className="flex gap-3 pt-2">
            <Link to="/login" className="flex-1"><Button variant="outline" size="sm" className="w-full">Login</Button></Link>
            <Link to="/register" className="flex-1"><Button size="sm" className="w-full">Sign Up</Button></Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
