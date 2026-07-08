import { Search, RotateCcw } from "lucide-react";
import Button from "../common/Button.jsx";
import Input from "../common/Input.jsx";
import { JOB_TYPES, EXPERIENCE_LEVELS } from "../../utils/constants.js";

function FilterPanel({ filters, onFilterChange, onReset }) {
  const update = (key, value) => onFilterChange({ ...filters, [key]: value });

  return (
    <div className="glass-card p-6 space-y-5 sticky top-24">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">Filters</h3>
        <button onClick={onReset} className="text-xs text-accent hover:underline flex items-center gap-1">
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Search</label>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Job title or company..."
            value={filters.search || ""}
            onChange={(e) => update("search", e.target.value)}
            className="w-full rounded-lg border border-white/20 bg-white/5 pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Job Type</label>
        <div className="flex flex-wrap gap-2">
          {JOB_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => update("jobType", filters.jobType === type ? "" : type)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                filters.jobType === type ? "bg-accent/20 text-accent border border-accent/30" : "bg-white/5 text-gray-400 border border-white/10 hover:border-white/20"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Experience</label>
        <select
          value={filters.experienceLevel || ""}
          onChange={(e) => update("experienceLevel", e.target.value)}
          className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="" className="bg-navy">All levels</option>
          {EXPERIENCE_LEVELS.map((level) => (
            <option key={level} value={level} className="bg-navy">{level}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Sort By</label>
        <select
          value={filters.sortBy || "relevance"}
          onChange={(e) => update("sortBy", e.target.value)}
          className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="relevance" className="bg-navy">Relevance</option>
          <option value="newest" className="bg-navy">Newest</option>
          <option value="salary-high" className="bg-navy">Salary: High to Low</option>
          <option value="salary-low" className="bg-navy">Salary: Low to High</option>
          <option value="match" className="bg-navy">Match Score</option>
        </select>
      </div>
    </div>
  );
}

export default FilterPanel;
