import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

function GlobalSearch({ className = "" }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/jobs?search=${encodeURIComponent(trimmed)}`);
    } else {
      navigate("/jobs");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <Search
        size={16}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2"
        style={{ color: "var(--text-muted)" }}
      />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search jobs, companies..."
        aria-label="Search jobs"
        className="focus-ring h-10 w-full rounded-xl pl-10 pr-4 text-sm transition-all duration-200"
        style={{
          background: "var(--bg-input)",
          color: "var(--text-primary)",
          border: "1px solid var(--border-color)",
        }}
      />
    </form>
  );
}

export default GlobalSearch;
