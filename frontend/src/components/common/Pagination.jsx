import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <nav
      className="flex justify-center items-center gap-2 mt-8 flex-wrap"
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="focus-ring flex h-9 w-9 items-center justify-center rounded-xl transition disabled:opacity-40"
        style={{
          background: "var(--bg-elevated)",
          color: "var(--text-secondary)",
          border: "1px solid var(--border-color)",
        }}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const pageNum = index + 1;
        const isActive = page === pageNum;

        return (
          <button
            key={pageNum}
            type="button"
            onClick={() => onPageChange(pageNum)}
            aria-current={isActive ? "page" : undefined}
            className={`focus-ring min-w-[36px] px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive ? "text-white accent-gradient shadow-sm" : ""
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
            {pageNum}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="focus-ring flex h-9 w-9 items-center justify-center rounded-xl transition disabled:opacity-40"
        style={{
          background: "var(--bg-elevated)",
          color: "var(--text-secondary)",
          border: "1px solid var(--border-color)",
        }}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}

export default Pagination;
