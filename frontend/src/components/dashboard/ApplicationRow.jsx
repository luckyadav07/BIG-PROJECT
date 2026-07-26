import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { StatusBadge } from "../application/ApplicationCard.jsx";
import { formatDate } from "../../utils/formatters.js";

function ApplicationRow({ application }) {
  const jobId = application.jobId?._id;

  return (
    <div
      className="group flex items-center justify-between gap-4 rounded-xl px-4 py-3 transition-all duration-200 hover:shadow-sm"
      style={{
        border: "1px solid var(--border-color)",
        background: "var(--bg-elevated)",
      }}
    >
      <div className="min-w-0 flex-1">
        <p
          className="truncate font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          {application.jobId?.title}
        </p>
        <p
          className="truncate text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          {application.jobId?.company}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <div className="hidden text-right sm:block">
          <StatusBadge status={application.status} />
          <p
            className="mt-1 text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            {formatDate(application.createdAt)}
          </p>
        </div>

        {jobId && (
          <Link
            to={`/jobs/${jobId}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg opacity-0 transition-all duration-200 group-hover:opacity-100 focus-ring"
            style={{
              background: "var(--sidebar-hover-bg)",
              color: "var(--text-secondary)",
            }}
            aria-label={`View ${application.jobId?.title}`}
          >
            <ChevronRight size={16} />
          </Link>
        )}
      </div>
    </div>
  );
}

export default ApplicationRow;
