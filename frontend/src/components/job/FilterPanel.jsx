import { useState } from "react";
import {
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  X,
  Sparkles,
} from "lucide-react";
import Card from "../common/Card.jsx";
import Select from "../common/Select.jsx";

const JOB_TYPE_LABELS = {
  fulltime: "Full-time",
  internship: "Internship",
  remote: "Remote",
  contract: "Contract",
};

const EXPERIENCE_LEVEL_LABELS = {
  fresher: "Fresher",
  "0-1 years": "0-1 Years",
  "1-3 years": "1-3 Years",
  "3+ years": "3+ Years",
};

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "newest", label: "Newest" },
  { value: "salary-high", label: "Salary: High to Low" },
  { value: "salary-low", label: "Salary: Low to High" },
  { value: "match", label: "Match Score" },
];

const CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "fullstack", label: "Full Stack" },
  { value: "devops", label: "DevOps & Cloud" },
  { value: "design", label: "Design" },
  { value: "data-ai", label: "Data & AI" },
];

const SALARY_RANGES = [
  { value: 0, label: "Any Salary" },
  { value: 5, label: "₹5+ LPA" },
  { value: 10, label: "₹10+ LPA" },
  { value: 15, label: "₹15+ LPA" },
  { value: 20, label: "₹20+ LPA" },
  { value: 25, label: "₹25+ LPA" },
];

function FilterSection({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="border-t py-4 first:border-t-0 first:pt-0"
      style={{ borderColor: "var(--border-color)" }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="focus-ring flex w-full items-center justify-between rounded-lg py-1.5 text-left cursor-pointer group"
        aria-expanded={open}
      >
        <span
          className="text-xs font-semibold uppercase tracking-wider transition-colors duration-200 text-gray-400 group-hover:text-gray-200"
        >
          {title}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          style={{ color: "var(--text-muted)" }}
        />
      </button>

      {open && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
}

function CustomCheckbox({ label, checked, onChange, id }) {
  return (
    <label htmlFor={id} className="flex items-center gap-3 cursor-pointer group select-none py-1 block">
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />
        <div className="h-5 w-5 rounded-lg border border-white/10 bg-white/5 transition-all duration-200 peer-checked:bg-accent peer-checked:border-accent group-hover:border-accent/40 flex items-center justify-center">
          <svg
            className="h-3.5 w-3.5 text-white scale-0 transition-transform duration-200 peer-checked:scale-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <span className="text-sm font-medium transition-colors duration-200 text-gray-400 group-hover:text-gray-200 peer-checked:text-white">
        {label}
      </span>
    </label>
  );
}

function CustomRadio({ label, checked, onChange, id }) {
  return (
    <label htmlFor={id} className="flex items-center gap-3 cursor-pointer group select-none py-1 block">
      <div className="relative flex items-center justify-center">
        <input
          type="radio"
          id={id}
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />
        <div className="h-5 w-5 rounded-full border border-white/10 bg-white/5 transition-all duration-200 peer-checked:border-accent group-hover:border-accent/40 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-accent scale-0 transition-transform duration-200 peer-checked:scale-100" />
        </div>
      </div>
      <span className="text-sm font-medium transition-colors duration-200 text-gray-400 group-hover:text-gray-200 peer-checked:text-white">
        {label}
      </span>
    </label>
  );
}

function FilterPanel({
  filters,
  onFilterChange,
  onReset,
  className = "",
}) {
  const update = (key, value) => onFilterChange({ ...filters, [key]: value });

  const toggleArrayItem = (key, value) => {
    const list = filters[key] || [];
    if (list.includes(value)) {
      update(key, list.filter((item) => item !== value));
    } else {
      update(key, [...list, value]);
    }
  };

  // Build list of active filter chips
  const activeChips = [];
  if (filters.search) {
    activeChips.push({ key: "search", type: "search", label: `"${filters.search}"` });
  }
  if (filters.category) {
    const catObj = CATEGORIES.find((c) => c.value === filters.category);
    if (catObj) activeChips.push({ key: "category", type: "category", label: catObj.label });
  }
  if (filters.jobTypes && filters.jobTypes.length > 0) {
    filters.jobTypes.forEach((type) => {
      activeChips.push({
        key: `jobType-${type}`,
        type: "jobTypes",
        value: type,
        label: JOB_TYPE_LABELS[type] || type,
      });
    });
  }
  if (filters.experienceLevels && filters.experienceLevels.length > 0) {
    filters.experienceLevels.forEach((level) => {
      activeChips.push({
        key: `exp-${level}`,
        type: "experienceLevels",
        value: level,
        label: EXPERIENCE_LEVEL_LABELS[level] || level,
      });
    });
  }
  if (filters.salary && filters.salary > 0) {
    activeChips.push({ key: "salary", type: "salary", label: `₹${filters.salary}+ LPA` });
  }

  const removeChip = (chip) => {
    if (chip.type === "search") {
      update("search", "");
    } else if (chip.type === "category") {
      update("category", "");
    } else if (chip.type === "salary") {
      update("salary", 0);
    } else if (chip.type === "jobTypes") {
      update(
        "jobTypes",
        filters.jobTypes.filter((t) => t !== chip.value)
      );
    } else if (chip.type === "experienceLevels") {
      update(
        "experienceLevels",
        filters.experienceLevels.filter((l) => l !== chip.value)
      );
    }
  };

  return (
    <Card className={`space-y-5 border border-white/5 shadow-md sticky top-24 ${className}`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b" style={{ borderColor: "var(--border-color)" }}>
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal size={16} className="text-accent" />
          <h3
            className="text-base font-bold flex items-center gap-1.5"
            style={{ color: "var(--text-primary)" }}
          >
            Filter Options
          </h3>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="focus-ring flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold text-accent transition hover:bg-accent/5 duration-200 cursor-pointer"
        >
          <RotateCcw size={12} />
          Reset
        </button>
      </div>

      {/* Active Filter Chips */}
      {activeChips.length > 0 && (
        <div className="space-y-2">
          <div className="text-[10px] uppercase font-bold tracking-wider text-gray-500">Active Filters</div>
          <div className="flex flex-wrap gap-1.5">
            {activeChips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                onClick={() => removeChip(chip)}
                className="focus-ring inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition cursor-pointer hover:brightness-110"
                style={{
                  background: "var(--sidebar-active-bg)",
                  color: "var(--sidebar-active-text)",
                  border: "1px solid var(--border-color)",
                }}
              >
                {chip.label}
                <X size={12} className="opacity-70 hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Category Accordion */}
      <FilterSection title="Category" defaultOpen={true}>
        <div className="grid grid-cols-2 gap-1.5">
          {CATEGORIES.map((cat) => {
            const isActive = filters.category === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => update("category", cat.value)}
                className={`focus-ring text-left px-3 py-2 text-xs font-medium rounded-xl transition duration-200 cursor-pointer ${
                  isActive
                    ? "bg-accent text-white shadow-sm border border-accent/20"
                    : "hover:bg-[var(--sidebar-hover-bg)]"
                }`}
                style={
                  !isActive
                    ? {
                        background: "var(--bg-elevated)",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border-color)",
                      }
                    : undefined
                }
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Job Type Checkboxes */}
      <FilterSection title="Job Type" defaultOpen={true}>
        <div className="space-y-1">
          {Object.entries(JOB_TYPE_LABELS).map(([value, label]) => (
            <CustomCheckbox
              key={value}
              id={`jt-${value}`}
              label={label}
              checked={(filters.jobTypes || []).includes(value)}
              onChange={() => toggleArrayItem("jobTypes", value)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Experience Checkboxes */}
      <FilterSection title="Experience" defaultOpen={true}>
        <div className="space-y-1">
          {Object.entries(EXPERIENCE_LEVEL_LABELS).map(([value, label]) => (
            <CustomCheckbox
              key={value}
              id={`el-${value}`}
              label={label}
              checked={(filters.experienceLevels || []).includes(value)}
              onChange={() => toggleArrayItem("experienceLevels", value)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Salary Radio List */}
      <FilterSection title="Min Salary (LPA)" defaultOpen={true}>
        <div className="space-y-1">
          {SALARY_RANGES.map((range) => (
            <CustomRadio
              key={range.value}
              id={`sal-${range.value}`}
              label={range.label}
              checked={filters.salary === range.value}
              onChange={() => update("salary", range.value)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Sort Options dropdown */}
      <FilterSection title="Sort By" defaultOpen={false}>
        <Select
          value={filters.sortBy || "relevance"}
          onChange={(e) => update("sortBy", e.target.value)}
          options={SORT_OPTIONS}
          className="w-full"
        />
      </FilterSection>
    </Card>
  );
}

export default FilterPanel;
