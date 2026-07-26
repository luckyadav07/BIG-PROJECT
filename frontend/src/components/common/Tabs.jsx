function Tabs({ tabs, activeTab, onChange, className = "" }) {
  return (
    <div
      className={`inline-flex gap-1 rounded-xl p-1 ${className}`}
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-color)",
      }}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`focus-ring rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
              isActive ? "text-white accent-gradient shadow-sm" : ""
            }`}
            style={
              !isActive
                ? { color: "var(--text-secondary)" }
                : undefined
            }
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
