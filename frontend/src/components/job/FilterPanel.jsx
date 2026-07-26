import { useState } from "react";
import {
  Search,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  X,
} from "lucide-react";
import Card from "../common/Card.jsx";
import Button from "../common/Button.jsx";
import Select from "../common/Select.jsx";
import Badge from "../common/Badge.jsx";
import { JOB_TYPES, EXPERIENCE_LEVELS } from "../../utils/constants.js";

const JOB_TYPE_LABELS = {
  fulltime: "Full-time",
  internship: "Internship",
  remote: "Remote",
};

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "newest", label: "Newest" },
  { value: "salary-high", label: "Salary: High to Low" },
  { value: "salary-low", label: "Salary: Low to High" },
  { value: "match", label: "Match Score" },
];

function FilterSection({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="border-t pt-4 first:border-t-0 first:pt-0"
      style={{ borderColor: "var(--border-color)" }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="focus-ring flex w-full items-center justify-between rounded-lg py-1 text-left"
        aria-expanded={open}
      >
        <span
          className="text-caption uppercase tracking-wider"
          style={{ color: "var(--text-secondary)" }}
        >
          {title}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          style={{ color: "var(--text-muted)" }}
        />
      </button>

      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

function FilterPanel({
  filters,
  onFilterChange,
  onReset,
  className = "",
}) {
  const update = (key, value) => onFilterChange({ ...filters, [key]: value });

  const activeFilters = [
    filters.search && { key: "search", label: `"${filters.search}"` },
    filters.jobType && {
      key: "jobType",
      label: JOB_TYPE_LABELS[filters.jobType] || filters.jobType,
    },
    filters.experienceLevel && {
      key: "experienceLevel",
      label: filters.experienceLevel,
    },
  ].filter(Boolean);

  const removeFilter = (key) => update(key, "");

  return (
    <Card className={`sticky top-24 !p-5 space-y-4 ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-accent" />
          <h3
            className="text-h4"
            style={{ color: "var(--text-primary)" }}
          >
            Filters
          </h3>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="focus-ring inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-accent transition hover:underline"
        >
          <RotateCcw size={12} />
          Reset
        </button>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {activeFilters.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => removeFilter(key)}
              className="focus-ring inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition"
              style={{
                background: "var(--sidebar-active-bg)",
                color: "var(--sidebar-active-text)",
                border: "1px solid var(--border-color)",
              }}
            >
              {label}
              <X size={12} />
            </button>
          ))}
        </div>
      )}

      <FilterSection title="Search">
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--text-muted)" }}
          />
          <input
            type="text"
            placeholder="Job title or company..."
            value={filters.search || ""}
            onChange={(e) => update("search", e.target.value)}
            className="focus-ring w-full rounded-xl py-2.5 pl-9 pr-4 text-sm transition"
            style={{
              background: "var(--bg-input)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-color)",
            }}
          />
        </div>
      </FilterSection>

      <FilterSection title="Job Type">
        <div className="flex flex-wrap gap-2">
          {JOB_TYPES.map((type) => {
            const active = filters.jobType === type;

            return (
              <button
                key={type}
                type="button"
                onClick={() =>
                  update("jobType", active ? "" : type)
                }
                className={`focus-ring rounded-xl px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                  active
                    ? "bg-accent/15 text-accent border border-accent/30 shadow-sm"
                    : "hover:bg-[var(--sidebar-hover-bg)]"
                }`}
                style={
                  !active
                    ? {
                        background: "var(--bg-elevated)",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border-color)",
                      }
                    : undefined
                }
              >
                {JOB_TYPE_LABELS[type] || type}
              </button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="Experience">
        <Select
          value={filters.experienceLevel || ""}
          onChange={(e) => update("experienceLevel", e.target.value)}
          placeholder="All levels"
          options={EXPERIENCE_LEVELS.map((level) => ({
            value: level,
            label: level.charAt(0).toUpperCase() + level.slice(1),
          }))}
        />
      </FilterSection>

      <FilterSection title="Sort By">
        <Select
          value={filters.sortBy || "relevance"}
          onChange={(e) => update("sortBy", e.target.value)}
          options={SORT_OPTIONS}
        />
      </FilterSection>
    </Card>
  );
}

export default FilterPanel;
