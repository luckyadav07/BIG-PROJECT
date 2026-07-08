import { Link } from "react-router-dom";
import { Sparkles, Globe, Share2, ExternalLink } from "lucide-react";
import { APP_NAME } from "../../utils/constants.js";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Dashboard", href: "/login" },
    { label: "Pricing", href: "#pricing" },
    { label: "Blog", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "API Docs", href: "#" },
    { label: "Career Tips", href: "#" },
    { label: "FAQ", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Security", href: "#" },
  ],
};

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg accent-gradient">
                <Sparkles size={18} className="text-white" />
              </div>
              <span className="text-lg font-bold text-white">{APP_NAME}</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              AI-powered job matching platform helping thousands find their dream careers faster.
            </p>
            <div className="flex gap-3">
              {[Globe, Share2, ExternalLink].map((Icon, i) => (
                <a key={i} href="#" className="text-gray-400 hover:text-accent transition">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("#") ? (
                      <a href={link.href} className="text-sm text-gray-400 hover:text-accent transition">{link.label}</a>
                    ) : (
                      <Link to={link.href} className="text-sm text-gray-400 hover:text-accent transition">{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
