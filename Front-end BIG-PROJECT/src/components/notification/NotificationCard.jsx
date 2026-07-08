import { Briefcase, FileText, MessageCircle, Bell, Clock } from "lucide-react";
import { formatRelativeTime } from "../../utils/formatters.js";

const typeConfig = {
  application: { icon: Briefcase, color: "text-accent" },
  job: { icon: Briefcase, color: "text-success" },
  resume: { icon: FileText, color: "text-warning" },
  coach: { icon: MessageCircle, color: "text-accent" },
  reminder: { icon: Clock, color: "text-danger" },
};

function NotificationCard({ notification, onMarkRead }) {
  const config = typeConfig[notification.type] || { icon: Bell, color: "text-gray-400" };
  const Icon = config.icon;

  return (
    <div
      onClick={() => onMarkRead?.(notification)}
      className={`glass-card p-4 cursor-pointer transition hover:scale-[1.01] hover:border-accent/30 ${
        !notification.read ? "bg-accent/5 border-accent/20" : ""
      }`}
    >
      <div className="flex gap-3">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 ${config.color}`}>
          <Icon size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-white">{notification.title}</h4>
            {!notification.read && <span className="h-2 w-2 rounded-full bg-accent shrink-0" />}
          </div>
          <p className="text-sm text-gray-400 mt-0.5">{notification.description}</p>
          <p className="text-xs text-gray-500 mt-1">{formatRelativeTime(notification.timestamp)}</p>
        </div>
      </div>
    </div>
  );
}

export default NotificationCard;
