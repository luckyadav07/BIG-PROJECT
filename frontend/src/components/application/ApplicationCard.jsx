import Badge from "../common/Badge.jsx";
import { formatDate } from "../../utils/formatters.js";
import { Link } from "react-router-dom";

const statusVariant = {
  applied: "neutral",
  interview: "info",
  offer: "success",
  rejected: "danger",
};

function StatusBadge({ status }) {
  return (
    <Badge variant={statusVariant[status] || "neutral"}>
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </Badge>
  );
}

function ApplicationCard({ application, onWithdraw }) {
  return (
    <div className="glass-card p-4 hover:border-accent/30 transition lg:hidden">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold text-white">{application.jobTitle}</p>
          <p className="text-sm text-gray-400">{application.company}</p>
        </div>
        <StatusBadge status={application.status} />
      </div>
      <p className="text-xs text-gray-500 mb-3">Applied {formatDate(application.dateApplied)}</p>
      <div className="flex gap-2">
        <Link to={`/jobs/${application.id}`} className="text-xs text-accent hover:underline">View Job</Link>
        <button onClick={() => onWithdraw?.(application)} className="text-xs text-danger hover:underline ml-auto">Withdraw</button>
      </div>
    </div>
  );
}

export { StatusBadge };
export default ApplicationCard;
